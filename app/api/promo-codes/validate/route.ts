// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { code, amount } = body

//     if (!code || !amount) {
//       return NextResponse.json(
//         { error: 'Code and amount are required' },
//         { status: 400 }
//       )
//     }

//     // TODO: Query promo code from database
//     // Verify:
//     // - Code exists and is active
//     // - Max uses not exceeded
//     // - Discount amount calculation

//     console.log('[v0] Validating promo code:', { code, amount })

//     // Mock validation
//     const mockCodes: Record<string, { type: string; value: number }> = {
//       ARON10: { type: 'percentage', value: 10 },
//       ARON20: { type: 'percentage', value: 20 },
//       WELCOME: { type: 'fixed', value: 25 },
//     }

//     const promoCode = mockCodes[code.toUpperCase()]

//     if (!promoCode) {
//       return NextResponse.json(
//         { error: 'Invalid promo code' },
//         { status: 400 }
//       )
//     }

//     let discount = 0
//     if (promoCode.type === 'percentage') {
//       discount = Math.round((amount * promoCode.value) / 100 * 100) / 100
//     } else if (promoCode.type === 'fixed') {
//       discount = Math.min(promoCode.value, amount)
//     }

//     return NextResponse.json({
//       success: true,
//       code: code.toUpperCase(),
//       type: promoCode.type,
//       value: promoCode.value,
//       discount,
//       finalAmount: amount - discount,
//     })
//   } catch (error) {
//     console.error('[v0] Promo code validation error:', error)
//     return NextResponse.json(
//       { error: 'Failed to validate promo code' },
//       { status: 500 }
//     )
//   }
// }
