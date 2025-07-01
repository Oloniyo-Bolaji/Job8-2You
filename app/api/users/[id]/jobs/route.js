import { db } from "@/app/database/index.js";
import { NextResponse } from "next/server";
import { jobsTable } from "@/app/database/schema.js";
import { eq, desc } from 'drizzle-orm';

export async function GET(req, context) {
   const { params } = context
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, error: "Missing user ID" },
        { status: 400 }
      );
    }

    const job = await db.query.jobsTable.findMany({
      where: (job, { eq }) => eq(job.userId, params.id),
      with: {
        user: true,
      },
      orderBy: (job) => desc(job.createdAt)
    });

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}