'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ✅ ADD PROPS TYPE
type BookingCalendarProps = {
  onSelectDate: (date: string) => void
}

export default function BookingCalendar({ onSelectDate }: BookingCalendarProps) {
  // ✅ FIX: use CURRENT DATE instead of hardcoded 2024
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    )
  }

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const statsCardClass =
    'bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40'

  return (
    <Card className={statsCardClass}>
      <div className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{monthName}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isSelected =
              selectedDate && day === selectedDate.getDate()
            const isAvailable = day && day >= new Date().getDate()

            return (
              <button
                key={index}
                onClick={() => {
                  if (day && isAvailable) {
                    const date = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )

                    setSelectedDate(date)

                    // ✅ FIX: send LOCAL DATE (YYYY-MM-DD) instead of ISO
                    const formattedDate = date.toLocaleDateString('en-CA') // YYYY-MM-DD
                    onSelectDate(formattedDate)
                  }
                }}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-colors
                  ${!day ? 'invisible' : ''}
                  ${
                    isAvailable
                      ? 'cursor-pointer hover:bg-muted'
                      : 'text-muted-foreground cursor-not-allowed'
                  }
                  ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border'
                  }
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        {selectedDate && (
          <div className="mt-4 p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
            <p className="text-sm font-medium text-foreground">
              Selected:{' '}
              {selectedDate.toLocaleDateString('default', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}