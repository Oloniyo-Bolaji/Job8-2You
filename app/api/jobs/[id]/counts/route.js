import { db } from '@/app/database'
import { usersTable, jobsTable } from '@/app/database/schema'
import { eq, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { auth } from '@lib/auth'

export async function POST(req, context) {
  const { params } = context
  try {
    const session = await auth() // Get the current user session
    const jobId = params?.id //Get the particular job's id

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (!jobId) {
      return NextResponse.json({ success: false, error: 'Missing job ID' }, { status: 400 })
    }

    // Get the current user
    const user = await db.select().from(usersTable).where(eq(usersTable.email, session.user.email))

    const userId = user?.[0]?.id

    // Get the job
    const job = await db.select().from(jobsTable).where(eq(jobsTable.id, jobId))

    const jobCreatorId = job?.[0]?.userId

    // check if the current user is the creator, if true don't increment click
    if (userId === jobCreatorId) {
      return NextResponse.json({ success: true, message: 'Job owner click ignored' })
    }

    // Increment click count
    await db
      .update(jobsTable)
      .set({
        clickCount: sql`${jobsTable.clickCount} + 1`,
      })
      .where(eq(jobsTable.id, jobId))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
