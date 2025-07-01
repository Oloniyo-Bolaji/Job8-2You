import { db } from '@/app/database/index.js'
import { jobsTable, usersTable, applicationsTable } from '@/app/database/schema.js'
import { NextResponse } from 'next/server'
import { eq, and , sql} from 'drizzle-orm'

export async function POST(req) {
  const body = await req.json()
  const { data, jobId, userEmail } = body

  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, userEmail))

    const userId = user?.[0]?.id

    if (!userId) {
      throw new Error('User not found')
    }

    const existing = await db
      .select()
      .from(applicationsTable)
      .where(and(eq(applicationsTable.userId, userId), eq(applicationsTable.jobId, jobId)))

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'You already applied to this job' },
        { status: 400 }
      )
    }

    await db.insert(applicationsTable).values({
      userId: userId,
      jobId,
      resume: data,
    })
    
    await db
      .update(jobsTable)
      .set({
        applicationCount: sql`${jobsTable.applicationCount} + 1`,
      })
      .where(eq(jobsTable.id, jobId))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET(req, context) {
   const { params } = context
  try {
    if (!params?.id) {
      return NextResponse.json({ success: false, error: 'Missing job ID' }, { status: 400 })
    }

    const job = await db.query.jobsTable.findFirst({
      where: (job, { eq }) => eq(job.id, params.id),
      with: {
        user: true,
        job_id_applications_job_id: true,
      },
    })

    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: job })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
