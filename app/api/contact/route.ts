// app/api/contact/route.ts
import { NextResponse } from 'next/server'

const FORMCARRY_MAIL_KEY = process.env.FORMCARRY_MAIL_KEY

export async function POST(req: Request) {
  if (!FORMCARRY_MAIL_KEY) {
    return NextResponse.json(
      { error: '邮件服务配置错误' }, 
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const response = await fetch(`https://formcarry.com/s/${FORMCARRY_MAIL_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: '发送失败' }, 
      { status: 500 }
    )
  }
}