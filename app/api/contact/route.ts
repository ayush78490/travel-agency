import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Forward the request to your actual API endpoint
    const response = await fetch('https://ecomlancers.com/travel_website/Api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: body.name,
        email: body.email,
        contact: body.phone,
        message: body.message
      }).toString()
    })

    const data = await response.text() // Get raw response first
    
    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData, { status: response.status })
    } catch {
      // If not JSON, return as text
      return new NextResponse(data, { status: response.status })
    }

  } catch (error) {
    console.error('Error in contact API route:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}