import { NextResponse } from 'next/server'

export async function POST() {
  // This endpoint will be handled by the backend API
  // For now, return a redirect response
  return NextResponse.json(
    { error: 'This endpoint should be handled by the backend API' },
    { status: 501 }
  )
}