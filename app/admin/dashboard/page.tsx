"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Music,
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

import AdminBookings from "@/components/admin/admin-bookings";
import AdminAnalytics from "@/components/admin/admin-analytics";
import aronLogo from "@/assets/aron-logo.png";
import { useTheme } from "@/hooks/useTheme";
import SessionsPage from "../../../components/sessions/page";
import { fetchWithAuth } from "@/lib/api"; // ✅ ADDED

type Stats = {
  bookings: number;
  revenue: number;
  users: number;
};

type Booking = {
  id: string;
  date: string;
  time: string;
  total: number;
  status?: string;
};

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const statsCardClass =
    "bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40";

  // ✅ FIXED: STATS
  useEffect(() => {
    fetchWithAuth("/api/bookings/stats")
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats error:", err));
  }, []);

  // ✅ FIXED: BOOKINGS
  useEffect(() => {
    fetchWithAuth("/api/bookings/admin")
      .then((data) => {
        console.log("🔥 ADMIN BOOKINGS:", data);
        setBookings(data);
      })
      .catch((err) => {
        console.error("❌ ADMIN BOOKINGS FAILED:", err);
      });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <Image
                  src={aronLogo}
                  alt="Aron Studios"
                  width={0}
                  height={0}
                  className="h-10 w-auto"
                  priority
                  loading="eager"
                />
                <span className="font-bold text-white">Aron Studios</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin Panel</span>

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              <Link href="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 space-y-2 md:hidden">
              <p className="text-sm text-muted-foreground">Admin Panel</p>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className={statsCardClass}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.bookings ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">live data</p>
            </CardContent>
          </Card>

          <Card className={statsCardClass}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-sky-600" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${stats?.revenue ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">this month</p>
            </CardContent>
          </Card>

          <Card className={statsCardClass}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.users ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                total customers
              </p>
            </CardContent>
          </Card>

          <Card className={statsCardClass}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                Occupancy Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground mt-1">
                studio utilization
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Manage Bookings</h2>
                <p className="text-muted-foreground">
                  View and manage all studio bookings
                </p>
              </div>

              <Button className="bg-sky-500 text-white hover:bg-sky-600">
                + New Booking
              </Button>
            </div>

            <AdminBookings bookings={bookings} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Analytics & Reports</h2>
              <p className="text-muted-foreground">
                Studio performance and revenue metrics
              </p>
            </div>
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Studio Settings</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className={statsCardClass}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Session Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Studio Sessions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <SessionsPage />
      </main>
    </div>
  );
}
