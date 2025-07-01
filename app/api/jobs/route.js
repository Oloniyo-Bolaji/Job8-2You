import { db } from "@/app/database/index.js";
import { jobsTable, usersTable } from "@/app/database/schema.js";
import { NextResponse } from "next/server";
import { desc, eq } from 'drizzle-orm';



export async function GET() {
  try {
     const jobsWithUsers = await db.query.jobsTable.findMany({
     with: {
      user: true,
      },
     orderBy: (jobs) => desc(jobs.deadline)
    });
    return NextResponse.json({ success: true, data: jobsWithUsers });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}