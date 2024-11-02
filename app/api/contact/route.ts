// app/api/contact/route.ts
import { NextResponse } from 'next/server'

const FORMCARRY_MAIL_KEY = process.env.FORMCARRY_MAIL_KEY

export async function POST(req: Request) {
  if (!FORMCARRY_MAIL_KEY) {
    return NextResponse.json(
      { error: '邮件服务配置错误' }, 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
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
    return NextResponse.json(
      { code: 200, message: 'Email sent successfully' },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    )
  } catch (error) {
    console.error('邮件发送错误:', error)
    return NextResponse.json(
      { error: '发送失败', details: error.message }, 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}