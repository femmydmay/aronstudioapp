"use client";

import { useEffect, useState } from "react";
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
  Calendar,
  Clock,
  DollarSign,
  LogOut,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

import BookingCalendar from "@/components/customer/booking-calendar";
import UpcomingBookings from "@/components/customer/upcoming-bookings";
import NotificationsBell from "@/components/notifications-bell";
import aronLogo from "@/assets/aron-logo.png";
import { useTheme } from "@/hooks/useTheme";
import { fetchWithAuth } from "@/lib/api";
import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  date: string;
  time: string;
  total: number;
  status?: string;
};

export default function CustomerDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.warn("No Firebase user yet");
        return;
      }

      try {
        const data = await fetchWithAuth("/api/bookings");
        setBookings(data || []);
      } catch (err) {
        console.error("Bookings error:", err);
      }
    });

    return () => unsub();
  }, []);


  const session = {
  id: "839012d3-36a2-11f1-a104-94bb438030a4",
  price: 150,
};
 const handleBooking = () => {
  if (!selectedDate || !selectedTime) {
    alert("Please select date and time");
    return;
  }

  // ✅ MUST MATCH REAL SESSION ID FROM DB
  const sessionId = "839012d3-36a2-11f1-a104-94bb438030a4";

  localStorage.setItem(
    "bookingData",
    JSON.stringify({
      sessionId, // ✅ FIXED (no hardcoding inside object)
      date: selectedDate,
      time: selectedTime,
      total: 150,
    })
  );

  router.push("/customer/checkout");
};

  const lightBlueCard =
    "bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40";

  const lightBlueButton =
    "bg-sky-500 text-white hover:bg-sky-600 border-sky-400";

  const statsCardClass =
    "bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
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
              <NotificationsBell />
              <span className="text-sm text-muted-foreground">
                Welcome, Customer
              </span>

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
              <p className="text-sm text-muted-foreground">
                Welcome, Customer
              </p>
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full justify-start">
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
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">Book Session</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`space-y-4 p-4 rounded-xl ${lightBlueCard}`}>
                <h2 className="text-2xl font-bold mb-2">Select Date</h2>
                <BookingCalendar onSelectDate={(date) => setSelectedDate(date)} />
              </div>

              <div className={`space-y-4 p-4 rounded-xl ${lightBlueCard}`}>
                <h2 className="text-2xl font-bold mb-2">Available Times</h2>

                <Card className={lightBlueCard}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Studio A - Recording Session
                    </CardTitle>
                    <CardDescription>1 Hour Session - $150</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "09:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "02:00 PM",
                        "03:00 PM",
                        "04:00 PM",
                      ].map((time) => (
                        <Button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`${lightBlueButton} ${
                            selectedTime === time ? "bg-green-500" : ""
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>

                    <Button onClick={handleBooking} className={`w-full ${lightBlueButton}`}>
                      Continue to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6 mt-6">
            <div className={`p-4 rounded-xl ${lightBlueCard}`}>
              <h2 className="text-2xl font-bold mb-2">Your Bookings</h2>
              <p className="text-muted-foreground">
                View and manage your studio sessions
              </p>
            </div>

            <UpcomingBookings bookings={bookings} />
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <Card className={lightBlueCard}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                Upcoming Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>

          <Card className={lightBlueCard}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600" />
                Total Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>

          <Card className={lightBlueCard}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-sky-600" />
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${bookings.reduce((sum, b) => sum + (b.total || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}