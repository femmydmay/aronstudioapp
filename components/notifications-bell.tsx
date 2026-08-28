"use client";

import { useState, useEffect } from "react";
import { Bell, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchWithAuth } from "@/lib/api"; // ✅ IMPORTANT

interface Notification {
  id: string;
  type:
    | "booking_confirmation"
    | "booking_reminder"
    | "booking_cancelled"
    | "payment_received";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ✅ FETCH REAL NOTIFICATIONS
  useEffect(() => {
    fetchWithAuth("/api/notifications")
      .then((data) => {
        console.log("🔔 NOTIFICATIONS:", data);

        // ✅ MAP BACKEND DATA → FRONTEND FORMAT
        const formatted = data.map((n: any) => ({
          id: n.id,
          type: "booking_confirmation", // you can improve later
          title: "Booking Update",
          message: n.message,
          timestamp: new Date(n.createdAt).toLocaleString(),
          read: n.read,
        }));

        setNotifications(formatted);
      })
      .catch((err) => {
        console.error("❌ NOTIFICATIONS ERROR:", err);
      });
  }, []);

  // ✅ MARK ONE AS READ (OPTIONAL: backend later)
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // ✅ REMOVE (UI ONLY)
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // ✅ MARK ALL READ
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // ✅ ICON HELPER (based on type)
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking_confirmation":
        return <CheckCircle2 className="w-5 h-5 text-secondary" />;
      case "booking_reminder":
        return <AlertCircle className="w-5 h-5 text-primary" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 max-h-96 overflow-y-auto shadow-lg z-50">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-background">
            <h3 className="font-semibold">Notifications</h3>

            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all as read
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground text-sm">
                  No notifications
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-muted/20" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {getIcon(notification.type)}

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-sm ${!notification.read ? "font-semibold" : ""}`}
                      >
                        {notification.title}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>

                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
