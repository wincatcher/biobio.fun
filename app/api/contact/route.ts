// app/api/contact/route.ts
import { NextResponse } from 'next/server'

const FORMCARRY_MAIL_KEY = process.env.FORMCARRY_MAIL_KEY

export async function POST(req: Request) {
  if (!FORMCARRY_MAIL_KEY) {
    console.error('邮件服务配置错误: FORMCARRY_MAIL_KEY 未设置');
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
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || '邮件服务响应错误')
    }

    return NextResponse.json(
      { message: '邮件发送成功', data }, 
      { status: 200 }
    )
  } catch (error: any) {
    console.error('邮件发送错误:', error)
    return NextResponse.json(
      { 
        error: '发送失败', 
        details: error?.message || '未知错误',
      }, 
      { status: 500 }
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