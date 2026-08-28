// import { NextRequest, NextResponse } from 'next/server'
// import { sendNotification, notificationTemplates, NotificationType } from '@/lib/notifications'

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { userId, type, channel, recipientEmail, recipientPhone, bookingDetails } = body

//     if (!userId || !type || !channel) {
//       return NextResponse.json(
//         { error: 'Missing required fields: userId, type, channel' },
//         { status: 400 }
//       )
//     }

//     // Get template content
//     let content = ''
//     const notificationType = type as NotificationType

//     if (notificationType === 'booking_confirmation' || 
//         notificationType === 'booking_reminder' || 
//         notificationType === 'booking_cancelled') {
//       const template = notificationTemplates[notificationType](bookingDetails)
//       content = template.content
//     } else if (notificationType === 'payment_received') {
//       const template = notificationTemplates.payment_received(bookingDetails?.amount || 0)
//       content = template.content
//     }

//     const result = await sendNotification({
//       userId,
//       type: notificationType,
//       channel: channel as 'email' | 'sms' | 'in_app',
//       recipientEmail,
//       recipientPhone,
//       bookingDetails,
//       content,
//     })

//     // TODO: Save notification record to database
//     console.log('[v0] Notification sent:', { userId, type, channel, result })

//     return NextResponse.json({
//       success: true,
//       message: 'Notification sent successfully',
//       ...result,
//     })
//   } catch (error) {
//     console.error('[v0] Send notification error:', error)
//     return NextResponse.json(
//       { error: 'Failed to send notification' },
//       { status: 500 }
//     )
//   }
// }

// // GET - Retrieve notifications for a user
// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams
//     const userId = searchParams.get('userId')
//     const limit = searchParams.get('limit') || '10'

//     if (!userId) {
//       return NextResponse.json(
//         { error: 'User ID is required' },
//         { status: 400 }
//       )
//     }

//     // TODO: Query notifications from database
//     console.log('[v0] GET notifications:', { userId, limit })

//     const mockNotifications = [
//       {
//         id: 'notif_1',
//         type: 'booking_confirmation',
//         channel: 'email',
//         content: 'Your booking has been confirmed',
//         sentAt: new Date().toISOString(),
//         read: true,
//       },
//       {
//         id: 'notif_2',
//         type: 'booking_reminder',
//         channel: 'sms',
//         content: 'Reminder: Your session is tomorrow at 2:00 PM',
//         sentAt: new Date().toISOString(),
//         read: false,
//       },
//     ]

//     return NextResponse.json({
//       success: true,
//       notifications: mockNotifications,
//       total: mockNotifications.length,
//     })
//   } catch (error) {
//     console.error('[v0] GET notifications error:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch notifications' },
//       { status: 500 }
//     )
//   }
// }
