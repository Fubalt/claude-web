import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "@/components/AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Bareface",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-[960px] px-6 py-14 pb-20 md:py-16">
          <AdminDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
