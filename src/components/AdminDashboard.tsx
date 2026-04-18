"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

type Application = {
  id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: ApplicationStatus;
  adminNotes?: string;
};

export function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch("/api/applications", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setApplications(data);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setError("Invalid password");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Login failed");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timeout - Check if DATABASE_URL is configured in .env.local");
      } else {
        setError("Network error or server unavailable");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, status: ApplicationStatus) {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${password}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? updated : app))
        );
        setSelectedApp(null);
        setAdminNotes("");
        alert(`Application ${status.toLowerCase()}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update");
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-6 py-16">
        <h2 className="mb-6 text-2xl font-bold">Admin Login</h2>
        {error && (
          <div className="mb-4 border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border rounded px-3 py-2"
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-16">Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Applications ({applications.length})</h2>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setPassword("");
            setApplications([]);
          }}
          className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80"
        >
          Logout
        </button>
      </div>

      {selectedApp ? (
        <div className="border border-border rounded p-6 bg-card">
          <h3 className="text-xl font-bold mb-4">
            {selectedApp.firstName} {selectedApp.lastName}
          </h3>
          <div className="space-y-2 mb-6">
            <p>
              <strong>Email:</strong> {selectedApp.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedApp.role}
            </p>
            <p>
              <strong>Status:</strong> {selectedApp.status}
            </p>
            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(selectedApp.createdAt).toLocaleDateString()}
            </p>
          </div>

          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Admin notes..."
            className="w-full border border-border rounded p-3 mb-4 min-h-24"
          />

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleUpdateStatus(selectedApp.id, "APPROVED")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleUpdateStatus(selectedApp.id, "REJECTED")}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reject
            </button>
            <button
              onClick={() => {
                setSelectedApp(null);
                setAdminNotes("");
              }}
              className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {applications.map((app) => (
            <div
              key={app.id}
              onClick={() => {
                setSelectedApp(app);
                setAdminNotes(app.adminNotes || "");
              }}
              className="border border-border rounded p-4 cursor-pointer hover:bg-muted/30 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {app.firstName} {app.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{app.email}</p>
                  <p className="text-sm text-muted-foreground">{app.role}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                      app.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : app.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
