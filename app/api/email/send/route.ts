import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
})

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json()

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: text.replace(/\n/g, '<br>')
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    )
  }
} 