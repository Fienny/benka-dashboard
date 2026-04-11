"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState("PJ");
  const [region, setRegion] = useState("TAS");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type, region }),
    });

    if (res.ok) {
      router.push("/projects");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Create Project</h1>

      <Input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <Input
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />

      <Button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </Button>
    </div>
  );
}