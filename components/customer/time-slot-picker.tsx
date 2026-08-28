'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, AlertCircle } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface TimeSlotPickerProps {
  selectedDate: Date | null
  sessionId: string
  durationMinutes: number
  onSelect: (time: string) => void
}

export default function TimeSlotPicker({
  selectedDate,
  sessionId,
  durationMinutes,
  onSelect,
}: TimeSlotPickerProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedDate) return

    const fetchAvailableSlots = async () => {
      setLoading(true)
      try {
        // TODO: Fetch available time slots from API
        // For now, mock available slots
        const slots: TimeSlot[] = [
          { time: '09:00 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '11:00 AM', available: false },
          { time: '12:00 PM', available: true },
          { time: '01:00 PM', available: true },
          { time: '02:00 PM', available: true },
          { time: '03:00 PM', available: true },
          { time: '04:00 PM', available: false },
          { time: '05:00 PM', available: true },
          { time: '06:00 PM', available: true },
        ]

        setTimeSlots(slots)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailableSlots()
  }, [selectedDate, sessionId])

  if (!selectedDate) {
    return (
      <Card>
        <CardContent className="pt-8">
          <div className="flex gap-3 p-3 bg-muted rounded-lg">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Please select a date to view available time slots</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Available Times
        </CardTitle>
        <CardDescription>
          {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {loading ? (
              <div className="col-span-full text-center py-4">
                <p className="text-muted-foreground">Loading available times...</p>
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="col-span-full text-center py-4">
                <p className="text-muted-foreground">No available slots for this date</p>
              </div>
            ) : (
              timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  onClick={() => {
                    setSelectedTime(slot.time)
                    onSelect(slot.time)
                  }}
                  disabled={!slot.available}
                  variant={selectedTime === slot.time ? 'default' : 'outline'}
                  className={`
                    ${selectedTime === slot.time ? 'bg-primary text-primary-foreground' : ''}
                    ${!slot.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
                  `}
                >
                  {slot.time}
                </Button>
              ))
            )}
          </div>

          {selectedTime && (
            <div className="mt-4 p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Selected:</span> {selectedTime} ({durationMinutes} minutes)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
