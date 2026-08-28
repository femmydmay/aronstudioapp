import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, phone } = body

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual database operations
    console.log('[v0] Signup attempt:', { email, fullName, phone })

    // TODO: Check if email already exists
    // TODO: Hash password with bcrypt
    // TODO: Create user in database
    // TODO: Send verification email

    const user = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      phone,
      role: 'customer',
    }

    return NextResponse.json({
      success: true,
      user,
      message: 'Account created successfully. Please sign in.',
    })
  } catch (error) {
    console.error('[v0] Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
