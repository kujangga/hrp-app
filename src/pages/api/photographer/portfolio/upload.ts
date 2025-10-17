import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure multer for file uploads
const upload = multer({
  storage: multerS3({
    s3: cloudinary,
    bucket: process.env.CLOUDINARY_CLOUD_NAME,
    key: function (req, file, cb) {
      cb(null, `portfolio/${Date.now()}_${file.originalname}`)
    }
  })
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get session
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Get photographer profile
  const photographer = await prisma.photographer.findUnique({
    where: {
      userId: session.user.id
    }
  })

  if (!photographer) {
    return res.status(404).json({ error: 'Photographer profile not found' })
  }

  // Handle file upload
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    try {
      // Save portfolio item to database
      const portfolioItem = await prisma.portfolio.create({
        data: {
          photographerId: photographer.id,
          url: req.file.location,
          title: req.body.title || 'Portfolio Image'
        }
      })

      return res.status(201).json({
        message: 'Image uploaded successfully',
        portfolioItem
      })
    } catch (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to save portfolio item' })
    }
  })
}