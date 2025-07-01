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

    await db
      .update(applicationsTable)
      .set({
        status: data,
      })
      .where(
        and(
          eq(applicationsTable.jobId, jobId),
          eq(applicationsTable.userId, userId)
        )
      )
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
