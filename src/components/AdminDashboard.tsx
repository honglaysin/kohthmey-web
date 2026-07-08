import React from "react";
import {
  Briefcase,
  CalendarDays,
  FileText,
  Gift,
  Handshake,
  Lock,
  LogOut,
  Mail,
  Newspaper,
  Send,
  Settings,
  Users,
  Youtube,
} from "lucide-react";
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
import { CONFIGURED_DIRECTUS_URL, DIRECTUS_URL } from "@/lib/directus";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const directusAdminUrl = `${CONFIGURED_DIRECTUS_URL}/admin`;
const ADMIN_TOKEN_KEY = "kohthmey_admin_access_token";
const ADMIN_REFRESH_TOKEN_KEY = "kohthmey_admin_refresh_token";

const collections = [
  {
    title: "Company Events",
    description: "Create and publish event cards on the About Us page.",
    collection: "company_events",
    icon: CalendarDays,
  },
  {
    title: "Contact Departments",
    description: "Manage email and phone cards on the Contact page.",
    collection: "contact_departments",
    icon: Mail,
  },
  {
    title: "Contact Messages",
    description: "Review messages submitted through the contact form.",
    collection: "contact_messages",
    icon: Send,
  },
  {
    title: "Job Openings",
    description: "Add and publish career openings on the Careers page.",
    collection: "job_openings",
    icon: Briefcase,
  },
  {
    title: "Career Applications",
    description: "Review applications and uploaded resumes.",
    collection: "career_applications",
    icon: FileText,
  },
  {
    title: "Career Benefits",
    description: "Control the benefit cards and icons on the Careers page.",
    collection: "career_benefits",
    icon: Gift,
  },
  {
    title: "Partners",
    description: "Manage partner names, logos, and website links.",
    collection: "partners",
    icon: Handshake,
  },
  {
    title: "Homepage Articles",
    description: "Update the Latest News cards shown on the home page.",
    collection: "homepage_articles",
    icon: Newspaper,
  },
  {
    title: "Service Sections",
    description: "Edit service blocks like the TNAOT News section.",
    collection: "service_sections",
    icon: Settings,
  },
  {
    title: "Promotion Videos",
    description: "Manage promo video tabs and uploaded MP4 files on Services.",
    collection: "promotion_videos",
    icon: Youtube,
  },
];

const directusCollectionUrl = (collection: string) =>
  `${directusAdminUrl}/content/${collection}`;

type DirectusLoginResponse = {
  data?: {
    access_token?: string;
    refresh_token?: string;
  };
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    const validateSession = async () => {
      const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch(`${DIRECTUS_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
              <CardDescription>
                Log in with your Directus account to access website controls.
              </CardDescription>
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-[#1E40AF] px-4 pb-16 pt-32 text-white md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Website Admin
            </h1>
            <p className="text-lg text-blue-100 md:text-xl">
              Manage website content through Directus. Published items appear on
              the public website; draft items stay hidden.
            </p>
          </div>
        </div>
      </section>

      <main className="px-4 py-12 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Directus Control Center
              </h2>
              <p className="mt-2 text-gray-600">
                Use Directus login to create, edit, publish, and review website
                data.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-[#1E40AF] hover:bg-[#1E3A8A]">
                <a
                  href={directusAdminUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Directus Admin
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>
                  Set content to published when it is ready for the public site.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>
                  Upload images in Directus file fields; the frontend reads them
                  automatically.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle>Forms</CardTitle>
                <CardDescription>
                  Contact messages and career applications are stored in
                  Directus collections.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.collection} className="rounded-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#1E40AF]">
                      <Icon size={22} />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={directusCollectionUrl(item.collection)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Manage {item.title}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Users className="text-[#1E40AF]" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Public Visibility
              </h2>
            </div>
            <p className="text-gray-600">
              For public content collections, set <strong>status</strong> to{" "}
              <strong>published</strong>. The website filters published content
              from Directus and keeps the existing static content as a fallback.
            </p>
            <p className="mt-3 text-gray-600">
              If you still see old website content, add published records in the
              matching Directus collection and refresh the page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
