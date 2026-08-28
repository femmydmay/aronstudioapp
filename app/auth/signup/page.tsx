'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password) {
        setError('Please fill in all required fields')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }

      // TODO: Replace with actual API call
      console.log('[v0] Signup attempt:', { email: formData.email, name: formData.fullName })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSuccess(true)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-secondary mx-auto" />
              <h2 className="text-2xl font-bold">Account Created!</h2>
              <p className="text-muted-foreground">
                Your account has been successfully created. Redirecting to login...
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Aron Studios</span>
          </div>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join Aron Studios and start booking</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
