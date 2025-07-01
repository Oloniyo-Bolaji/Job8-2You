import { db } from "@/app/database/index.js";
import { usersTable } from "@/app/database/schema.js";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';


export async function GET(req, context) {
  const { params } = context
  if(!params.id){
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
  try {
     const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, params.id));
    
    return NextResponse.json({ success: true, data: user[0] });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

