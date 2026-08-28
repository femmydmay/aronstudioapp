'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const revenueData = [
  { month: 'Jan', revenue: 8400, bookings: 40 },
  { month: 'Feb', revenue: 9600, bookings: 45 },
  { month: 'Mar', revenue: 11200, bookings: 52 },
  { month: 'Apr', revenue: 12800, bookings: 58 },
  { month: 'May', revenue: 15400, bookings: 65 },
  { month: 'Jun', revenue: 18450, bookings: 78 },
]

const sessionTypeData = [
  { name: 'Recording', value: 45, color: '#EF4444' },
  { name: 'Mixing', value: 30, color: '#22C55E' },
  { name: 'Mastering', value: 15, color: '#64748B' },
  { name: 'Consultation', value: 10, color: '#F97316' },
]

const topSessions = [
  { session: 'Studio A - Recording', bookings: 78, revenue: '$11,700' },
  { session: 'Studio B - Mixing', revenue: '$6,300', bookings: 42 },
  { session: 'Studio C - Mastering', revenue: '$3,000', bookings: 15 },
]


  const statsCardClass =
    "bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40";

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Revenue Trend */}
     <Card className={statsCardClass}>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue and booking growth</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)' }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Session Type Distribution */}
        <Card className={statsCardClass}>
          <CardHeader>
            <CardTitle>Session Type Distribution</CardTitle>
            <CardDescription>Bookings by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sessionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Sessions */}
       <Card className={statsCardClass}>
          <CardHeader>
            <CardTitle>Top Performing Sessions</CardTitle>
            <CardDescription>Most booked studio sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{session.session}</p>
                    <p className="text-xs text-muted-foreground">{session.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{session.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy Rate */}
      <Card className={statsCardClass}>
        <CardHeader>
          <CardTitle>Studio Occupancy</CardTitle>
          <CardDescription>Daily occupancy rate for all studios</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                }}
              />
              <Legend />
              <Bar
                dataKey="bookings"
                fill="var(--color-primary)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
