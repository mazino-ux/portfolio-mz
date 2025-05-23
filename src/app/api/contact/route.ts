import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Here you would typically send the email using a service like SendGrid, Resend, etc.
    // For demonstration, we'll just log it and return success
    
    console.log('Contact form submission:', body)
    
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, message: 'Error sending message' },
      { status: 500 }
    )
  }
}