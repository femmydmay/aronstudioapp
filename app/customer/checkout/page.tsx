"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Music, ArrowLeft, Lock, Loader } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { auth } from "@/lib/firebase";

export default function CheckoutPage() {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // ✅ LOAD DATA FROM DASHBOARD
  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingDetails(JSON.parse(data));
    }
  }, []);

  // ✅ SAFETY
  if (!bookingDetails) {
    return <p className="p-6">Loading booking...</p>;
  }

  const subtotal = bookingDetails.total || 0;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + tax - discount;

  const applyPromoCode = (code: string) => {
    if (code.toUpperCase() === "ARON10") {
      setDiscount(Math.round(subtotal * 0.1 * 100) / 100);
    } else if (code) {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  // ✅ FIXED CHECKOUT (THIS IS THE IMPORTANT PART)
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      await fetchWithAuth("/api/bookings", {
        method: "POST",
        body: JSON.stringify(bookingDetails),
      });

      console.log("BOOKING DETAILS:", bookingDetails);
      setBookingConfirmed(true);
      localStorage.removeItem("bookingData");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Booking failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (bookingConfirmed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-muted">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Aron Studios</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-8">
              <div className="text-center space-y-4">
                <div className="text-6xl">✅</div>
                <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                <p className="text-muted-foreground">
                  Your studio session has been successfully booked.
                </p>

                <div className="bg-muted p-4 rounded-lg text-left space-y-2">
                  <p className="font-semibold">Studio Session</p>
                  <p className="text-sm text-muted-foreground">
                    {bookingDetails.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {bookingDetails.time}
                  </p>
                  <p className="font-semibold text-primary mt-2">
                    Confirmation # BK
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>

                <Link href="/customer/dashboard">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // ✅ MAIN UI (UNCHANGED STRUCTURE)
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Aron Studios</h1>
            </div>

            <Link href="/customer/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CheckOut</CardTitle>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="border-b border-border pb-4">
                  <h3 className="font-semibold mb-2">Studio Session</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{bookingDetails.date}</p>
                    <p>{bookingDetails.time}</p>
                    <p>60 minutes</p>
                  </div>
                </div>

                <p className="text-sm">
                  Price per session:
                  <span className="font-semibold text-primary">
                    ${subtotal}
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promo Code</CardTitle>
                <CardDescription>
                  Have a promo code? Enter it below (try: ARON10)
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => applyPromoCode(promoCode)}
                  >
                    Apply
                  </Button>
                </div>

                {discount > 0 && (
                  <div className="p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
                    <p className="text-sm text-secondary">
                      Discount applied: -${discount.toFixed(2)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Complete Booking
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your payment is secure and encrypted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}