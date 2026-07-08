export const CONFIGURED_DIRECTUS_URL =
  import.meta.env.VITE_DIRECTUS_URL || "https://api.kohthmey.com";

export const DIRECTUS_URL = import.meta.env.DEV
  ? "/directus"
  : CONFIGURED_DIRECTUS_URL;

type DirectusListResponse<T> = {
  data?: T[];
};

type DirectusItemResponse<T> = {
  data?: T;
};

type DirectusUploadResponse = {
  data?: { id?: string } | { id?: string }[];
  id?: string;
};

async function readJsonOrNull<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text.trim()) return null;
  return JSON.parse(text) as T;
}

const buildQuery = (params: Record<string, string | undefined>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

async function getDirectusErrorMessage(response: Response, fallback: string) {
  try {
    const text = await response.text();
    if (!text) return fallback;

    try {
      const parsed = JSON.parse(text) as {
        errors?: { message?: string; extensions?: { code?: string } }[];
        message?: string;
      };
      const error = parsed.errors?.[0];

      if (error?.message) {
        return error.extensions?.code
          ? `${error.message} (${error.extensions.code})`
          : error.message;
      }

      if (parsed.message) return parsed.message;
    } catch {
      return text;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

export async function getItems<T>(
  collection: string,
  params: Record<string, string | undefined> = {}
) {
  const query = buildQuery(params);
  const response = await fetch(`${DIRECTUS_URL}/items/${collection}${query}`);

  if (!response.ok) {
    throw new Error(
      await getDirectusErrorMessage(
        response,
        `Failed to fetch ${collection}: ${response.status}`
      )
    );
  }

  const result = await readJsonOrNull<DirectusListResponse<T>>(response);
  return result?.data || [];
}

export async function getPublishedItems<T>(
  collection: string,
  params: Record<string, string | undefined> = {}
) {
  return getItems<T>(collection, {
    "filter[status][_eq]": "published",
    sort: "sort",
    ...params,
  });
}

export async function createItem<T>(
  collection: string,
  payload: Record<string, unknown>
) {
  const response = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getDirectusErrorMessage(
        response,
        `Failed to create ${collection}: ${response.status}`
      )
    );
  }

  const result = await readJsonOrNull<DirectusItemResponse<T>>(response);
  return result?.data || null;
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      await getDirectusErrorMessage(
        response,
        `Failed to upload file: ${response.status}`
      )
    );
  }

  const result = await readJsonOrNull<DirectusUploadResponse>(response);
  const fileId = Array.isArray(result?.data)
    ? result.data[0]?.id
    : result?.data?.id || result?.id;

  if (!fileId) {
    throw new Error(
      "CV upload reached Directus, but Directus did not return the file id. In Directus Public Policy, enable Read for directus_files and allow the id field, then submit again."
    );
  }

  return fileId;
}

export function assetUrl(
  file: string | { id?: string; filename_disk?: string } | null | undefined,
  fallback = ""
) {
  if (!file) return fallback;
  if (typeof file === "string") {
    return file.startsWith("http") || file.startsWith("/") ? file : `${DIRECTUS_URL}/assets/${file}`;
  }

  const id = file.id || file.filename_disk;
  return id ? `${DIRECTUS_URL}/assets/${id}` : fallback;
}

export function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      return value
        .split(/[,/]/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

export function richTextToText(value: unknown) {
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (
      (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
      (trimmed.startsWith("{") && trimmed.endsWith("}"))
    ) {
      try {
        return richTextToText(JSON.parse(trimmed));
      } catch {
        return trimmed;
      }
    }

    return trimmed.replace(/<[^>]*>/g, "").trim();
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;

    if (typeof record.text === "string") return record.text;
    if (typeof record.value === "string") return record.value;
    if (record.children) return richTextToText(record.children);
    if (record.blocks) return richTextToText(record.blocks);
    if (record.content) return richTextToText(record.content);

    const data = record.data as Record<string, unknown> | undefined;
    if (data?.text) return richTextToText(data.text);
    if (data?.items) return richTextToText(data.items);

    return "";
  }

  if (!Array.isArray(value)) return "";

  return value
    .map((block) => richTextToText(block))
    .filter(Boolean)
    .join("\n");
}
