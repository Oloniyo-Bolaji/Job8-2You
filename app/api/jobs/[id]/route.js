import { db } from "@/app/database/index.js";
import { NextResponse } from "next/server";
import { jobsTable, usersTable } from "@/app/database/schema.js";
import { eq } from 'drizzle-orm';

export async function GET(req, context) {
   const { params } = await context
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, error: "Missing job ID" },
        { status: 400 }
      );
    }

    const job = await db.query.jobsTable.findFirst({
      where: (job, { eq }) => eq(job.id, params.id),
      with: {
        user: true,
      },
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

export async function PUT(req) {
  const body = await req.json();
  const { data, userEmail } = body;

  try {
    const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, userEmail));

    const userId = user?.[0]?.id;

     if (!userId) {
      throw new Error("User not found");
    }
    
    await db.update(jobsTable).set({
      title: data.title,
      category: data.category,
      company: data.company,
      location: data.location,
      roleType: data.roleType,
      description: data.description,
      requirements: data.requirements,
      salary: data.salary,
      deadline: data.deadline,
      jobLink: data.jobLink,
      userId: userId,
    })
    .where(eq(jobsTable.id, data.id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const jobId = params?.id;

  if (!jobId) {
    console.log("No Job ID provided");
    return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
  }

  try {
    const result = await db.delete(jobsTable).where(eq(jobsTable.id, jobId));
    console.log("✅ Job deleted. Result:", result);

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("❌ Delete failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



