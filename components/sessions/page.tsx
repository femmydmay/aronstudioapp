'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Music, Plus, Edit2, Trash2, LogOut } from 'lucide-react'
import { fetchWithAuth } from '@/lib/api'

type Session = {
  id: string
  name: string
  description: string
  duration: number
  price: number | string
  maxDaily: number
  bookings?: number
}

export default function SessionsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    maxDaily: '',
  })

  // ✅ GET SESSIONS (SAFE FIX)
  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true)

        const data = await fetchWithAuth('/api/sessions')

        const safeSessions = Array.isArray(data)
          ? data
          : Array.isArray(data?.sessions)
          ? data.sessions
          : []

        setSessions(safeSessions)
      } catch (err) {
        console.error('Sessions error:', err)
        setSessions([])
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [])

  // ✅ CREATE / UPDATE SESSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      description: formData.description,
      duration: Number(formData.duration),
      price: Number(formData.price),
      maxDaily: Number(formData.maxDaily),
    }

    if (editingId) {
      await fetchWithAuth(`/api/sessions/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
    } else {
      await fetchWithAuth('/api/sessions', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    }

    const data = await fetchWithAuth('/api/sessions')

    const safeSessions = Array.isArray(data)
      ? data
      : Array.isArray(data?.sessions)
      ? data.sessions
      : []

    setSessions(safeSessions)

    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', description: '', duration: '', price: '', maxDaily: '' })
  }

  // ✅ DELETE SESSION
  const handleDelete = async (id: string) => {
    await fetchWithAuth(`/api/sessions/${id}`, {
      method: 'DELETE',
    })

    setSessions(prev => prev.filter(s => s.id !== id))
  }

  const statsCardClass =
    "bg-sky-50/60 border-sky-200/60 dark:bg-sky-950/20 dark:border-sky-900/40"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Aron Studios</h1>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Studio Sessions</h2>
            <p className="text-muted-foreground">
              Manage your studio services and pricing
            </p>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Edit Session' : 'Add New Session'}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Session Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Daily</label>
                    <Input
                      type="number"
                      value={formData.maxDaily}
                      onChange={(e) =>
                        setFormData({ ...formData, maxDaily: e.target.value })
                      }
                      required
                    />
                  </div>

                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingId ? 'Update' : 'Create'} Session
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingId(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Sessions List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <p className="text-muted-foreground">No sessions found</p>
          ) : (
            sessions.map((session) => (
              <Card key={session.id} className={statsCardClass}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{session.name}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(session.id)
                          setShowForm(true)
                          setFormData({
                            name: session.name,
                            description: session.description,
                            duration: String(session.duration),
                            price: String(session.price),
                            maxDaily: String(session.maxDaily),
                          })
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(session.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-semibold">{session.duration}m</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-semibold text-primary">
                       ${session.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Max Daily</p>
                      <p className="font-semibold">{session.maxDaily}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Bookings</p>
                      <p className="font-semibold">
                        {session.bookings ?? 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}