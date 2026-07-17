import React from "react";
import {
  Briefcase,
  CalendarDays,
  Edit,
  FileText,
  Gift,
  Handshake,
  ImageIcon,
  Lock,
  LogOut,
  Mail,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Trash2,
  Upload,
  Download,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DIRECTUS_URL, assetUrl } from "@/lib/directus";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ADMIN_TOKEN_KEY = "kohthmey_admin_access_token";
const ADMIN_REFRESH_TOKEN_KEY = "kohthmey_admin_refresh_token";

type FieldType =
  | "text"
  | "textarea"
  | "json-list"
  | "number"
  | "date"
  | "status"
  | "file"
  | "readonly";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  showInTable?: boolean;
};

type CollectionConfig = {
  title: string;
  description: string;
  collection: string;
  icon: LucideIcon;
  fields: FieldConfig[];
  readOnly?: boolean;
};

type DirectusRecord = Record<string, unknown> & { id?: string | number };

type DirectusLoginResponse = {
  data?: {
    access_token?: string;
    refresh_token?: string;
  };
};

type DirectusListResponse = {
  data?: DirectusRecord[];
};

type DirectusFileResponse = {
  data?: {
    id?: string;
  };
};

type DirectusFileValue = string | {
  id?: string;
  filename_disk?: string;
  filename_download?: string;
  title?: string;
  type?: string;
  filesize?: number | string;
};

const collections: CollectionConfig[] = [
  {
    title: "About Hero Images",
    description: "Manage the rotating hero images on the About Us page.",
    collection: "about_hero_images",
    icon: ImageIcon,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number", showInTable: true },
      { name: "image", label: "Image", type: "file" },
    ],
  },
  {
    title: "Company Events",
    description: "Create and publish event cards on the About Us page.",
    collection: "company_events",
    icon: CalendarDays,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number", showInTable: true },
      { name: "title", label: "Title", type: "text", required: true, showInTable: true },
      { name: "description", label: "Description", type: "textarea", showInTable: true },
      { name: "date_label", label: "Date Label", type: "text" },
      { name: "event_date", label: "Event Date", type: "date" },
      { name: "link", label: "Link", type: "text" },
      { name: "image", label: "Image", type: "file" },
    ],
  },
  {
    title: "Contact Departments",
    description: "Manage email and phone cards on the Contact page.",
    collection: "contact_departments",
    icon: Mail,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number" },
      { name: "title", label: "Title", type: "text", required: true, showInTable: true },
      { name: "emails", label: "Emails", type: "json-list", showInTable: true },
      { name: "phones", label: "Phones", type: "json-list", showInTable: true },
    ],
  },
  {
    title: "Contact Messages",
    description: "Review messages submitted through the contact form.",
    collection: "contact_messages",
    icon: Send,
    readOnly: true,
    fields: [
      { name: "id", label: "ID", type: "readonly", showInTable: true },
      { name: "name", label: "Name", type: "readonly", showInTable: true },
      { name: "email", label: "Email", type: "readonly", showInTable: true },
      { name: "phone", label: "Phone", type: "readonly" },
      { name: "message", label: "Message", type: "readonly", showInTable: true },
    ],
  },
  {
    title: "Job Openings",
    description: "Add and publish career openings on the Careers page.",
    collection: "job_openings",
    icon: Briefcase,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number" },
      { name: "title", label: "Title", type: "text", required: true, showInTable: true },
      { name: "department", label: "Department", type: "text", showInTable: true },
      { name: "location", label: "Location", type: "text", showInTable: true },
      { name: "descriptions", label: "Description", type: "textarea" },
      { name: "key_responsibilities", label: "Key Responsibilities", type: "textarea" },
      { name: "job_requirements", label: "Job Requirements", type: "textarea" },
    ],
  },
  {
    title: "Career Applications",
    description: "Review candidates and uploaded resumes.",
    collection: "career_applications",
    icon: FileText,
    readOnly: true,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "submitted_at", label: "Submitted Date", type: "readonly", showInTable: true },
      { name: "name", label: "Name", type: "readonly", showInTable: true },
      { name: "email", label: "Email", type: "readonly", showInTable: true },
      { name: "phone", label: "Phone", type: "readonly", showInTable: true },
      { name: "position", label: "Position", type: "readonly" },
      { name: "message", label: "Message", type: "readonly" },
      { name: "resume", label: "Resume", type: "file" },
    ],
  },
  {
    title: "Career Benefits",
    description: "Control benefit cards and icons on the Careers page.",
    collection: "career_benefits",
    icon: Gift,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number" },
      { name: "title", label: "Title", type: "text", required: true, showInTable: true },
      { name: "description", label: "Description", type: "textarea", showInTable: true },
      { name: "icon", label: "Icon", type: "file" },
    ],
  },
  {
    title: "Partners",
    description: "Manage partner names, logos, and website links.",
    collection: "partners",
    icon: Handshake,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number" },
      { name: "name", label: "Name", type: "text", required: true, showInTable: true },
      { name: "website", label: "Website", type: "text", showInTable: true },
      { name: "logo", label: "Logo", type: "file" },
    ],
  },
  {
    title: "Homepage Articles",
    description: "Update the Latest News cards shown on the home page.",
    collection: "homepage_articles",
    icon: Newspaper,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number" },
      { name: "title", label: "Title", type: "text", required: true, showInTable: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", showInTable: true },
      { name: "link", label: "Link", type: "text" },
      { name: "image", label: "Image", type: "file" },
    ],
  },
  {
    title: "Promotion Videos",
    description: "Manage promo video tabs, YouTube links, and uploaded MP4 files.",
    collection: "promotion_videos",
    icon: Youtube,
    fields: [
      { name: "status", label: "Status", type: "status", showInTable: true },
      { name: "sort", label: "Sort", type: "number", showInTable: true },
      { name: "title", label: "Title", type: "text", required: true, showInTable: true },
      { name: "video_url", label: "Video URL", type: "text", showInTable: true },
      { name: "youtube_url", label: "YouTube URL", type: "text" },
      { name: "video", label: "Uploaded Video", type: "file" },
    ],
  },
];

const contentStatusOptions = ["draft", "published", "archived"];
const applicationStatusOptions = ["new", "viewed"];

const getStatusOptions = (collection: CollectionConfig) =>
  isCareerApplications(collection) ? applicationStatusOptions : contentStatusOptions;

const formatStatusLabel = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

async function readJsonOrNull<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text.trim()) return null;
  return JSON.parse(text) as T;
}

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const text = await response.text();
    if (!text) return fallback;
    const parsed = JSON.parse(text) as {
      errors?: { message?: string; extensions?: { code?: string } }[];
      message?: string;
    };
    const error = parsed.errors?.[0];
    if (error?.message) return error.message;
    return parsed.message || fallback;
  } catch {
    return fallback;
  }
}

const previewValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") {
    const file = value as { id?: string; title?: string; filename_download?: string };
    return file.title || file.filename_download || file.id || "File";
  }
  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(text));
  }
  return text.length > 90 ? `${text.slice(0, 90)}...` : text;
};

const detailValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") {
    const file = value as { id?: string; title?: string; filename_download?: string };
    if (file.title || file.filename_download || file.id) {
      return file.title || file.filename_download || file.id || "File";
    }

    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

const valueToInput = (value: unknown) => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(String).join("\n");
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String).join("\n");
    } catch {
      return value;
    }
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const textToJsonList = (value: string) =>
  value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const toFileValue = (value: unknown): DirectusFileValue | null => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const file = value as Exclude<DirectusFileValue, string>;
    return {
      id: file.id,
      filename_disk: file.filename_disk,
      filename_download: file.filename_download,
      title: file.title,
      type: file.type,
      filesize: file.filesize,
    };
  }

  return null;
};

const formatFileSize = (value: unknown) => {
  const size = Number(value);
  if (!Number.isFinite(size) || size <= 0) return "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileMeta = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return {
      name: "Uploaded file",
      description: "",
    };
  }

  const file = value as Exclude<DirectusFileValue, string>;
  const name = file.title || file.filename_download || file.filename_disk || file.id || "Uploaded file";
  const details = [file.type, formatFileSize(file.filesize)].filter(Boolean).join(" - ");

  return {
    name,
    description: details,
  };
};

const isCareerApplications = (collection: CollectionConfig) =>
  collection.collection === "career_applications";

const getRecordFieldValue = (record: DirectusRecord | null, fieldName: string) => {
  if (!record) return undefined;

  if (fieldName === "submitted_at") {
    return (
      record.submitted_at ||
      record.date_created ||
      record.created_at ||
      record.created_on
    );
  }

  return record[fieldName];
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activeCollection, setActiveCollection] = React.useState(collections[0]);
  const [records, setRecords] = React.useState<DirectusRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = React.useState<DirectusRecord | null>(null);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});
  const [fileValues, setFileValues] = React.useState<Record<string, File | null>>({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [adminError, setAdminError] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const tableFields = activeCollection.fields
    .filter((field) => field.showInTable)
    .slice(0, isCareerApplications(activeCollection) ? 6 : 5);
  const ActiveIcon = activeCollection.icon;
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      !searchQuery ||
      Object.values(record)
        .map((value) => previewValue(value).toLowerCase())
        .join(" ")
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      String(record.status || "").toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const authHeaders = React.useCallback(
    (extra?: HeadersInit) => ({
      Authorization: `Bearer ${sessionStorage.getItem(ADMIN_TOKEN_KEY) || ""}`,
      ...extra,
    }),
    []
  );

  const loadRecords = React.useCallback(async () => {
    if (!activeCollection || !sessionStorage.getItem(ADMIN_TOKEN_KEY)) return;

    setIsLoadingRecords(true);
    setAdminError("");

    try {
      const fields = [
        "*",
        ...activeCollection.fields
          .filter((field) => field.type === "file")
          .map((field) => `${field.name}.*`),
      ].join(",");

      const params = new URLSearchParams({
        fields,
        limit: "100",
      });

      const response = await fetch(
        `${DIRECTUS_URL}/items/${activeCollection.collection}?${params.toString()}`,
        {
          headers: authHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            `Unable to load ${activeCollection.title}.`
          )
        );
      }

      const result = await readJsonOrNull<DirectusListResponse>(response);
      setRecords(result?.data || []);
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Unable to load records.");
    } finally {
      setIsLoadingRecords(false);
    }
  }, [activeCollection, authHeaders]);

  React.useEffect(() => {
    const validateSession = async () => {
      const savedToken = sessionStorage.getItem(ADMIN_TOKEN_KEY);

      if (!savedToken) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch(`${DIRECTUS_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (!response.ok) {
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
          sessionStorage.removeItem(ADMIN_REFRESH_TOKEN_KEY);
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error validating admin session:", error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    validateSession();
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) loadRecords();
  }, [isAuthenticated, loadRecords]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      const result = (await response.json()) as DirectusLoginResponse;
      const accessToken = result.data?.access_token;

      if (!accessToken) {
        throw new Error("Directus did not return an access token.");
      }

      sessionStorage.setItem(ADMIN_TOKEN_KEY, accessToken);
      if (result.data?.refresh_token) {
        sessionStorage.setItem(
          ADMIN_REFRESH_TOKEN_KEY,
          result.data.refresh_token
        );
      }

      setPassword("");
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : "Unable to log in."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_REFRESH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  const startCreate = () => {
    const initialValues: Record<string, string> = {};
    activeCollection.fields.forEach((field) => {
      if (field.type === "file" || field.type === "readonly") return;
      initialValues[field.name] = field.type === "status" ? "published" : "";
    });

    setSelectedRecord(null);
    setFormValues(initialValues);
    setFileValues({});
    setIsEditing(true);
  };

  const startEdit = (record: DirectusRecord) => {
    const nextValues: Record<string, string> = {};
    activeCollection.fields.forEach((field) => {
      if (field.type === "file") return;
      nextValues[field.name] = valueToInput(record[field.name]);
    });

    setSelectedRecord(record);
    setFormValues(nextValues);
    setFileValues({});
    setIsEditing(true);
  };

  const uploadAdminFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${DIRECTUS_URL}/files`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, "Unable to upload file."));
    }

    const result = await readJsonOrNull<DirectusFileResponse>(response);
    return result?.data?.id || null;
  };

  const buildPayload = async () => {
    const payload: Record<string, unknown> = {};

    for (const field of activeCollection.fields) {
      if (field.type === "readonly") continue;

      if (field.type === "file") {
        const file = fileValues[field.name];
        if (file) {
          payload[field.name] = await uploadAdminFile(file);
        }
        continue;
      }

      const value = formValues[field.name];
      if (value === undefined) continue;

      if (field.type === "json-list") {
        payload[field.name] = JSON.stringify(textToJsonList(value));
      } else if (field.type === "number") {
        payload[field.name] = value === "" ? null : Number(value);
      } else if (field.type === "date") {
        payload[field.name] = value === "" ? null : value;
      } else {
        payload[field.name] = value;
      }
    }

    return payload;
  };

  const saveRecord = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setAdminError("");

    try {
      const payload = await buildPayload();
      const isUpdate = Boolean(selectedRecord?.id);
      const url = isUpdate
        ? `${DIRECTUS_URL}/items/${activeCollection.collection}/${selectedRecord?.id}`
        : `${DIRECTUS_URL}/items/${activeCollection.collection}`;

      const response = await fetch(url, {
        method: isUpdate ? "PATCH" : "POST",
        headers: authHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Unable to save item."));
      }

      setIsEditing(false);
      await loadRecords();
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Unable to save item.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecord = async (record: DirectusRecord) => {
    if (!record.id) return;
    if (!window.confirm("Delete this item?")) return;

    setAdminError("");

    try {
      const response = await fetch(
        `${DIRECTUS_URL}/items/${activeCollection.collection}/${record.id}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Unable to delete item."));
      }

      await loadRecords();
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Unable to delete item.");
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formValues[field.name] || "";
    const existingFile = selectedRecord?.[field.name];

    if (field.type === "readonly") {
      return (
        <div
          key={field.name}
          className={`space-y-2 ${
            field.name === "message" ? "md:col-span-2 xl:col-span-3" : ""
          }`}
        >
          <Label>{field.label}</Label>
          <div className="min-h-12 whitespace-pre-wrap rounded-md border bg-gray-50 px-3 py-3 text-base text-gray-700">
            {detailValue(getRecordFieldValue(selectedRecord, field.name))}
          </div>
        </div>
      );
    }

    if (field.type === "textarea" || field.type === "json-list") {
      return (
        <div key={field.name} className="space-y-2 md:col-span-2 xl:col-span-3">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "json-list" && (
            <p className="text-xs text-gray-500">Enter one item per line.</p>
          )}
          <Textarea
            id={field.name}
            value={value}
            required={field.required}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                [field.name]: event.target.value,
              }))
            }
            className="min-h-40 text-base"
          />
        </div>
      );
    }

    if (field.type === "status") {
      return (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <select
            id={field.name}
            value={value}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                [field.name]: event.target.value,
              }))
            }
            className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
          >
            {getStatusOptions(activeCollection).map((status) => (
              <option key={status} value={status}>
                {formatStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "file") {
      const fileUrl = assetUrl(toFileValue(existingFile));
      const fileMeta = getFileMeta(existingFile);

      return (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {fileUrl ? (
            <div className="flex flex-col gap-3 rounded-md border bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-purple-600 ring-1 ring-gray-200">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {fileMeta.name}
                  </p>
                  {fileMeta.description && (
                    <p className="truncate text-xs text-gray-500">
                      {fileMeta.description}
                    </p>
                  )}
                </div>
              </div>
              <Button asChild variant="outline" className="shrink-0 gap-2">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" download>
                  <Download size={16} />
                  {isCareerApplications(activeCollection)
                    ? "Download CV"
                    : "View current file"}
                </a>
              </Button>
            </div>
          ) : (
            <p className="rounded-md border bg-gray-50 px-3 py-3 text-sm text-gray-500">
              No file uploaded.
            </p>
          )}
          {!activeCollection.readOnly && (
            <Input
              id={field.name}
              type="file"
              className="h-12 text-base"
              onChange={(event) =>
                setFileValues((current) => ({
                  ...current,
                  [field.name]: event.target.files?.[0] || null,
                }))
              }
            />
          )}
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name}>{field.label}</Label>
        <Input
          id={field.name}
          type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
          value={value}
          required={field.required}
          className="h-12 text-base"
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              [field.name]: event.target.value,
            }))
          }
        />
      </div>
    );
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <p className="text-gray-600">Checking admin session...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="flex min-h-[80vh] items-center justify-center px-4 pt-24">
          <Card className="w-full max-w-md rounded-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#1E40AF]">
                <Lock size={24} />
              </div>
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {loginError && (
                  <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {loginError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A]"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo/logo.png" alt="Koh Thmey" className="h-8 w-auto" />
            <span className="text-gray-300">/</span>
            <span className="font-semibold">Website Admin</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={handleLogout}
            className="gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut size={16} />
            My Account
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
          <aside className="border-r bg-white px-4 py-8 md:min-h-screen md:w-64 md:shrink-0">
            <nav className="space-y-1 md:sticky md:top-24">
            {collections.map((item) => {
              const Icon = item.icon;
              const isActive = activeCollection.collection === item.collection;

              return (
                <button
                  key={item.collection}
                  type="button"
                  onClick={() => {
                    setActiveCollection(item);
                    setIsEditing(false);
                    setSelectedRecord(null);
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
            </nav>
          </aside>

          <section className="min-w-0 flex-1 px-4 py-8 md:px-10">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                <h1 className="text-2xl font-bold">
                    {isEditing
                      ? selectedRecord?.id
                        ? `Edit ${activeCollection.title}`
                        : `Create ${activeCollection.title}`
                      : activeCollection.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    {isEditing
                      ? "Edit the fields below, then save directly to Directus."
                      : activeCollection.description}
                </p>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Back to List
                    </Button>
                  ) : (
                  <Button type="button" variant="outline" onClick={loadRecords} className="gap-2">
                    <RefreshCw size={16} />
                    Refresh
                    </Button>
                  )}
                  {!isEditing && !activeCollection.readOnly && (
                    <Button
                      type="button"
                      onClick={startCreate}
                    className="gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus size={16} />
                      New Item
                    </Button>
                  )}
                </div>
            </div>

            <Card className="w-full rounded-lg border-gray-200 shadow-sm">
              <CardContent className="p-6 md:p-8">
                {adminError && (
                  <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {adminError}
                  </p>
                )}

                {isEditing ? (
                  <form onSubmit={saveRecord} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {activeCollection.fields
                        .filter((field) => field.name !== "id")
                        .map(renderField)}
                    </div>
                    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center">
                      {(!activeCollection.readOnly ||
                        isCareerApplications(activeCollection)) && (
                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="gap-2 bg-purple-600 hover:bg-purple-700"
                        >
                          {isSaving ? (
                            "Saving..."
                          ) : (
                            <>
                              <Save size={16} />
                              Save
                            </>
                          )}
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      {Object.values(fileValues).some(Boolean) && (
                        <span className="flex items-center gap-2 text-sm text-gray-500">
                          <Upload size={15} />
                          File will upload when you save.
                        </span>
                      )}
                    </div>
                  </form>
                ) : isLoadingRecords ? (
                  <p className="py-8 text-center text-gray-600">Loading...</p>
                ) : (
                  <>
                  <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-2 font-semibold">
                      <ActiveIcon size={18} className="text-purple-600" />
                      <span>{activeCollection.title}</span>
                      <span className="text-xs font-normal text-gray-400">
                        {filteredRecords.length} items
                      </span>
                    </div>
                    <div className="relative lg:ml-auto lg:w-96">
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={17} />
                      <Input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search by title or body..."
                        className="pl-9"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="h-10 rounded-md border border-input bg-white px-3 text-sm"
                    >
                      <option value="all">All Statuses</option>
                      {getStatusOptions(activeCollection).map((status) => (
                        <option key={status} value={status}>
                          {formatStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          {tableFields.map((field) => (
                            <TableHead key={field.name}>{field.label}</TableHead>
                          ))}
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRecords.length ? (
                          filteredRecords.map((record) => (
                            <TableRow key={String(record.id)}>
                              <TableCell className="font-medium">
                                {record.id}
                              </TableCell>
                              {tableFields.map((field) => (
                                <TableCell key={field.name}>
                                  {previewValue(getRecordFieldValue(record, field.name))}
                                </TableCell>
                              ))}
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => startEdit(record)}
                                    className="h-8 gap-1 text-blue-600"
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  {!activeCollection.readOnly && (
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => deleteRecord(record)}
                                      className="h-8 gap-1 text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={tableFields.length + 2}
                              className="py-8 text-center text-gray-600"
                            >
                              No records found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  </>
                )}
              </CardContent>
            </Card>
          </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
