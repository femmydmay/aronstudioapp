'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, X } from 'lucide-react'

// ✅ FIX: define session + user properly
type Session = {
  id: string
  name: string
  description: string
  duration: number
  price: number
  maxDaily: number
}

type User = {
  id: string
  email: string
  role: string
}

type Booking = {
  id: string
  customer?: string
  email?: string
  session?: Session // ✅ FIXED (was string)
  user?: User       // ✅ optional (from backend)
  date: string
  time: string
  status?: string
  amount?: string | number
  payment?: string
}

interface AdminBookingsProps {
  bookings: Booking[]
}

export default function AdminBookings({ bookings }: AdminBookingsProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or booking ID..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-semibold">Booking ID</th>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Session</th>
              <th className="text-left p-4 font-semibold">Date & Time</th>
              <th className="text-left p-4 font-semibold">Amount</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="p-4 font-mono text-sm">{booking.id}</td>

                <td className="p-4">
                  <div>
                    {/* ✅ fallback to backend user email if customer not set */}
                    <p className="font-medium">
                      {booking.customer ?? booking.user?.email ?? 'N/A'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.email ?? booking.user?.email ?? ''}
                    </p>
                  </div>
                </td>

                {/* ✅ FIXED HERE */}
                <td className="p-4 text-sm">
                  {booking.session?.name ?? '-'}
                </td>

                <td className="p-4 text-sm">
                  <p>{booking.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.time}
                  </p>
                </td>

                <td className="p-4 font-semibold text-primary">
                  {booking.amount ?? booking.session?.price ?? '-'}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {booking.status ?? 'unknown'}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.payment === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.payment ?? 'unknown'}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {bookings?.length ?? 0} bookings
        </p>

        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}