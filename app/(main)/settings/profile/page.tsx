"use client";

import { useCurrentUser } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { data: user } = useCurrentUser();

  if (!user) {
    return null;
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-strong">Profile</h1>
        <p className="mt-1 text-sm text-soft">
          Manage your personal information
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.avatarUrl || undefined} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-strong">{user.name || "No name"}</p>
          <p className="text-sm text-soft">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            defaultValue={user.name || ""}
            placeholder="Your name"
            disabled
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={user.email} disabled />
        </div>

        <p className="text-xs text-soft">Profile editing coming soon.</p>
      </div>
    </div>
  );
}
