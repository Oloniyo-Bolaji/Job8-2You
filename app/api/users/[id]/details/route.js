import { db } from '@/app/database/index.js'
import { usersTable } from '@/app/database/schema.js'
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { auth } from '@lib/auth'

export async function POST(req) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { data } = body
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Missing data in request' },
        { status: 400 }
      )
    }

    // Get user
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .then((res) => res[0])

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    if (user.role === 'employee') {
      await db
        .update(usersTable)
        .set({
          headline: data.headline,
          bio: data.bio,
          skills: data.skills,
          resumeURL: data.resumeURL,
          linkedIn: data.linkedIn,
          x: data.x,
          instagram: data.instagram,
        })
        .where(eq(usersTable.id, user.id))
    } else {
      await db
        .update(usersTable)
        .set({
          companylocation: data.companylocation,
          year: data.year,
          description: data.description,
          contactEmail: data.contactEmail,
          websiteUrl: data.websiteUrl,
          address: data.address,
          linkedIn: data.linkedIn,
          x: data.x,
          instagram: data.instagram,
        })
        .where(eq(usersTable.id, user.id))
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Database Error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
