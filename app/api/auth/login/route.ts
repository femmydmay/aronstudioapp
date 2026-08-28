import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual database query and password verification
    console.log('[v0] Login attempt:', { email })

    // Mock authentication
    const isAdmin = email.includes('admin')
    const user = {
      id: 'user_123',
      email,
      fullName: isAdmin ? 'Admin User' : 'John Doe',
      role: isAdmin ? 'admin' : 'customer',
    }

    // TODO: Generate and set session token/JWT
    return NextResponse.json({
      success: true,
      user,
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9),
    })
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
