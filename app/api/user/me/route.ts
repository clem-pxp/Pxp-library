import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getCurrentUser } from "@/src/lib/auth-utils";
import { db, users } from "@/src/db";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(user);
}

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  username: z.string().min(1).max(50).optional(),
  avatarUrl: z.string().url().optional(),
});

export async function PATCH(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const result = updateProfileSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { name, username, avatarUrl } = result.data;

  if (!name && !username && !avatarUrl) {
    return NextResponse.json({ error: "No data to update" }, { status: 400 });
  }

  const updateData: {
    name?: string;
    username?: string;
    avatarUrl?: string;
    updatedAt: Date;
  } = {
    updatedAt: new Date(),
  };

  if (name !== undefined) updateData.name = name;
  if (username !== undefined) updateData.username = username;
  if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

  await db.update(users).set(updateData).where(eq(users.id, user.id));

  return NextResponse.json({ success: true });
}
