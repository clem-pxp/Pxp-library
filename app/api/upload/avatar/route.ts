import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getCurrentUser } from "@/src/lib/auth-utils";
import { uploadToBunny } from "@/lib/bunny";

const MAX_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/png", "image/jpeg"];

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only PNG and JPEG allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File must be under 1MB" },
      { status: 400 },
    );
  }

  const ext = file.type === "image/png" ? "png" : "jpg";
  const fileName = `${user.id}-${nanoid(8)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadToBunny(buffer, fileName, "avatars");

  return NextResponse.json({ url });
}
