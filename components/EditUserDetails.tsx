"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserId } from "@/hooks/user";
import { updateUserDetails } from "@/app/actions/userserveraction";
import { safeuserupdateinput } from "@/interfaces/userinterface";

// Shadcn UI components
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/stateful-button";
import { Buttons } from "./ui/button";

export default function EditUserDetails() {
  const router = useRouter();
  const { userId } = useUserId();
  const [formdata, setFormData] = useState<Partial<safeuserupdateinput>>({});
  const [editpageloading, setEditpageLoading] = useState(false);

  function handlechange(field: keyof safeuserupdateinput, value: string) {
    if (field === "skills") {
      const skillArray = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      setFormData((prev) => ({ ...prev, skills: skillArray }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      alert("Please login first!");
      return;
    }
    try {
      setEditpageLoading(true);
      const updated = await updateUserDetails(userId, formdata);
      if (updated) {
        router.push(`/user/profile/${userId}`);
      } else {
        alert("Failed to update profile!");
      }
    } catch (e: any) {
      console.error("Error updating profile:", e);
      alert("Something went wrong!");
    } finally {
      setEditpageLoading(false); 
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
            <Link href={`/user/profile/${userId}`}>
              <Buttons variant="secondary" className="text-black font-semibold cursor-pointer">Back</Buttons>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormItem label="Name" onChange={(val) => handlechange("name", val)} />
              <FormItem label="Username" onChange={(val) => handlechange("username", val)} />
              <FormItem label="Phone Number" onChange={(val) => handlechange("phonenumber", val)} />
              <FormItem label="Profession" onChange={(val) => handlechange("profession", val)} />
              <FormItem label="CTC" onChange={(val) => handlechange("ctc", val)} />
              <FormItem label="Location" onChange={(val) => handlechange("location", val)} />
            </div>

            <Separator />

            <div>
              <Label className="text-sm text-gray-700 mb-1 block">Description</Label>
              <Textarea
                placeholder="Describe yourself..."
                className="resize-none"
                onChange={(e) => handlechange("descreption", e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm text-gray-700 mb-1 block">
                Skills <span className="text-muted-foreground text-xs">(comma-separated)</span>
              </Label>
              <Input
                placeholder="e.g. C++, DSA, Java"
                onChange={(e) => handlechange("skills", e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:ring-blue-900">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
function FormItem({
  label,
  onChange,
  disabled = false,
}: {
  label: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      <Input
        type="text"
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="text-sm"
      />
    </div>
  );
}

