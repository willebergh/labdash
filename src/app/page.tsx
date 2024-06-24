"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ServiceGrid from "@/components/ServiceGrid";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div style={{ height: "100vh" }} className="flex flex-col">
      <div className="h-full">
        <ServiceGrid editMode={editMode} />
      </div>

      <div className="flex flex-row justify-start gap-8 p-8">
        <Button onClick={() => router.push("/create-service")}>
          Lägg till tjänst
        </Button>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Avlusta redigering" : "Redigera"}
        </Button>
      </div>
    </div>
  );
}
