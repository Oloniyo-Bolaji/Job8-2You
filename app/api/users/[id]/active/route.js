import { db } from '@/app/database/index.js'
import { jobsTable, usersTable } from '@/app/database/schema.js'
import { NextResponse } from 'next/server'
import { desc, gt, eq, and } from 'drizzle-orm'

export async function GET(req, context) {
  const { params } = context
  const userId = params.id
  const now = new Date()
  try {
    const activeJobs = await db.query.jobsTable.findMany({
      where: (job, { eq, gt, and }) => and(eq(job.userId, userId), gt(job.deadline, now)),
      with: {
        user: true,
      },
      orderBy: (jobs) => desc(jobs.deadline),
    })
    return NextResponse.json({ success: true, data: activeJobs })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
