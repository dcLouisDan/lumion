import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export async function GET() {
  return new Response('Hello from Next.js!')
}