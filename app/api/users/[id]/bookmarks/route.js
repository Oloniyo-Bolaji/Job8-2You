import { db } from '@/app/database/index.js'
import { jobsTable, usersTable, bookmarksTable } from '@/app/database/schema.js'
import { NextResponse } from 'next/server'
import { eq, inArray, desc } from 'drizzle-orm'

export async function GET(req, context) {
  const { params } = context
  try {
    const userId = params.id

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Missing user ID' }, { status: 400 })
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .then((res) => res[0])

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const bookmarked = await db.query.bookmarksTable.findMany({
      where: (bookmarked) => eq(bookmarked.userId, userId),
      with: {
        job: true,
        user: true,
      },
      orderBy: (bookmarked) => desc(bookmarked.createdAt),
    })

    return NextResponse.json({ success: true, data: bookmarked })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
