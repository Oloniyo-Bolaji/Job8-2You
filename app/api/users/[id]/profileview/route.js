import { db } from '@/app/database'
import { usersTable } from '@/app/database/schema'
import { eq, and, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function POST(req, context) {
   const { params } = context
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing job ID or user ID' },
        { status: 400 }
      )
    }

    await db
      .update(usersTable)
      .set({
        profileViews: sql`${usersTable.profileViews} + 1`,
      })
      .where(eq(usersTable.id, userId))

    return NextResponse.json({
      success: true,
    })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
