import { db } from "@/app/database/index.js"
import { usersTable } from "@/app/database/schema.js"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function POST(req) {
  const body = await req.json()
  const { data, userEmail } = body

  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))

    const userId = user?.[0]?.id

    if (!userId) {
      throw new Error("User not found")
    }

    await db
      .update(usersTable)
      .set({ role: data })
      .where(eq(usersTable.id, userId))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Database Error:", err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
