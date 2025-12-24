"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "@/components/icons";

async function updateProfile(data: {
  name?: string;
  username?: string;
  avatarUrl?: string;
}) {
  const res = await fetch("/api/user/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload/avatar", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Upload failed");
  }

  const data = await res.json();
  return data.url;
}

export default function ProfilePage() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadAvatar(file);
      mutation.mutate({ avatarUrl: url });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleNameBlur = () => {
    const value = nameRef.current?.value.trim();
    if (value && value !== user?.name) {
      mutation.mutate({ name: value });
    }
  };

  const handleUsernameBlur = () => {
    const value = usernameRef.current?.value.trim();
    if (value && value !== user?.username) {
      mutation.mutate({ username: value });
    }
  };

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
    <div className="lg:py-20 py-8 lg:px-20 px-5">
      <div className="mx-auto w-full max-w-[48rem]">
        <div className="flex flex-col">
          <div className="lg:mb-8 mb-6">
            <h1 className="lg:sub-3xl sub-2xl text-strong">Profile</h1>
            <p className="mt-1 lg:text-sm text-xs text-soft">
              Manage your personal information
            </p>
          </div>
          <div className="w-full h-[1px] bg-border-soft lg:mb-10 mb-8"></div>

          <div className="flex items-center lg:gap-4 gap-3 lg:mb-10 mb-6">
            <Avatar className="lg:size-18 size-14 rounded-full overflow-hidden shrink-0">
              <AvatarImage src={user.avatarUrl || undefined} />
              <AvatarFallback className="sub-3xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col">
                <p className="sub-sm text-strong">{user.name || "No name"}</p>
                <p className="text-2xs text-soft font-book hidden lg:block">
                  We only support PNGs and JPEGs under 1MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                layout="icon"
                className="w-fit"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Camera className="size-[0.875rem]" />
                <p className="sub-xs">
                  {isUploading ? "Uploading..." : "Change image"}
                </p>
              </Button>
            </div>
          </div>

          <div className="bg-light border-[0.5px] border-border-soft rounded-18">
            <div className="px-4 py-4 lg:py-3 lg:flex-row flex-col items-stretch flex lg:items-center justify-between lg:gap-4 gap-2 min-h-15">
              <div className="flex flex-col gap-1">
                <p className="sub-xs text-base">Email</p>
              </div>
              <div className="flex items-center gap-1 min-w-45">
                <span className="text-sm text-soft">{user.email}</span>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-border-soft"></div>
            <div className="px-4 py-4 lg:py-3 lg:flex-row flex-col items-stretch flex lg:items-center justify-between lg:gap-4 gap-2 min-h-15">
              <div className="flex flex-col gap-1">
                <p className="sub-xs text-base">Full name</p>
              </div>
              <div className="flex items-center gap-1 min-w-45">
                <input
                  ref={nameRef}
                  type="text"
                  defaultValue={user.name || ""}
                  onBlur={handleNameBlur}
                  className="w-full px-[0.625rem] py-1.5 border-[0.5px] border-border-base bg-gray-50 rounded-8 text-sm text-strong focus:border-1 focus:border-border-strong focus:outline-none"
                />
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-border-soft"></div>
            <div className="px-4 py-4 lg:py-3 lg:flex-row flex-col items-stretch flex lg:items-center justify-between lg:gap-4 gap-2 min-h-15">
              <div className="flex flex-col gap-1">
                <p className="sub-xs text-base">Username</p>
                <p className="text-2xs text-soft">
                  Nickname or first name, however you want to be called in
                  Linear
                </p>
              </div>
              <div className="flex items-center gap-1 min-w-45">
                <input
                  ref={usernameRef}
                  type="text"
                  defaultValue={user.username || ""}
                  onBlur={handleUsernameBlur}
                  className="w-full px-[0.625rem] py-1.5 border-[0.5px] border-border-base bg-gray-50 rounded-8 text-sm text-strong focus:border-1 focus:border-border-strong focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
