import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getServerAuthSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await getServerSession(req, res, authOptions)
}