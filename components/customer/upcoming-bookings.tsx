'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, MapPin, X, Edit2 } from 'lucide-react'

type Booking = {
  id: string | number
  session: any // ✅ FIX: was string, now object from backend
  date: string
  time: string
  status: string
  price: string
}

interface Props {
  bookings: Booking[] | any
}

const statsCardClass =
  "bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40";

export default function UpcomingBookings({ bookings }: Props) {

  // ✅ FIX: ensure bookings is ALWAYS an array
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="space-y-4">
      {safeBookings.length === 0 ? (
        <Card className={statsCardClass}>
          <CardContent className="pt-8">
            <div className="text-center space-y-2">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground">No upcoming bookings</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book Your First Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        safeBookings.map((booking: Booking) => (
          <Card key={booking.id} className={statsCardClass}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {booking.session?.name} {/* ✅ FIX HERE */}
                  </CardTitle>

                  <CardDescription>
                    {booking.date}
                  </CardDescription>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{booking.time}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Aron Studios</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="font-semibold text-primary">
                  {booking.price}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}