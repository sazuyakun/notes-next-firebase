import { createNote } from "@/lib/firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try {
    const { uid, content } = await request.json()
    if (!uid || !content) {
      return NextResponse.json({ error: 'Missing uid or content' }, { status: 400 });
    }
    await createNote( uid, content )
    return NextResponse.json({ message: 'Note Created' }, { status: 200 })
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: "Failed to create a note" }, { status: 500 })
  }
}
