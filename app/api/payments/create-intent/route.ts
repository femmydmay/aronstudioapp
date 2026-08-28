// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { amount, currency = 'usd', bookingId, promoCodeId } = body

//     if (!amount || !bookingId) {
//       return NextResponse.json(
//         { error: 'Amount and booking ID are required' },
//         { status: 400 }
//       )
//     }

//     // TODO: Validate amount and create Stripe PaymentIntent
//     // Example with Stripe SDK:
//     // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
//     // const intent = await stripe.paymentIntents.create({
//     //   amount: Math.round(amount * 100),
//     //   currency,
//     //   metadata: { bookingId, promoCodeId }
//     // })

//     console.log('[v0] Creating payment intent:', {
//       amount,
//       currency,
//       bookingId,
//       promoCodeId,
//     })

//     // Mock payment intent
//     const clientSecret = 'pi_mock_' + Math.random().toString(36).substr(2, 24)

//     return NextResponse.json({
//       success: true,
//       clientSecret,
//       amount,
//       currency,
//     })
//   } catch (error) {
//     console.error('[v0] Payment intent error:', error)
//     return NextResponse.json(
//       { error: 'Failed to create payment intent' },
//       { status: 500 }
//     )
//   }
// }
