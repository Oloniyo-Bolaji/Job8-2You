import { createUploadthing } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { getServerSession } from 'next-auth' // safer to import from next-auth/next
import { auth } from '@lib/auth' // fixed import path

const handleAuth = async () => {
  const session = await auth()
  if (!session?.user?.id) throw new UploadThingError('Unauthorized')
  return { id: session.user.id }
}
const f = createUploadthing()

export const ourFileRouter = {
  resumeUploader: f({
    // Accept these mime types with max 5MB size, one file only
    'application/pdf': { maxFileSize: '5MB', maxFileCount: 1 },
    'application/msword': { maxFileSize: '5MB', maxFileCount: 1 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      maxFileSize: '5MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // Runs after upload completes
      console.log('✅ Resume uploaded by user:', metadata.userId)
      console.log('📄 File URL:', file.ufsUrl) // This URL you can send to your frontend to save

      return { uploadedBy: metadata.userId, resumeUrl: file.ufsUrl }
    }),
}
