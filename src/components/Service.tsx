import { useEffect } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";

export default function Service({
  id,
  displayName,
  url,
  image,
  editMode,
}: {
  id: string;
  displayName: string;
  url: string;
  image: string;
  editMode?: boolean;
}) {
  const router = useRouter();

  const handleOpenLink = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) {
      e.stopPropagation();
      window.open(url, "_blank");
    }
  };

  const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/edit-service/" + id);
  };

  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await api.deleteService(id);
  };

  return (
    <div
      onClick={handleOpenLink}
      className={`border border-black h-full flex flex-row justify-center items-center gap-2 ${
        !editMode && "hover:bg-sky-500 cursor-pointer"
      }`}
    >
      <h1 style={{ wordBreak: "break-word" }} className="p-4 overflow-hidden">
        {displayName}
      </h1>
      {editMode && (
        <>
          <div
            style={{ width: "100px" }}
            className="flex flex-col gap-1 align-items"
          >
            <span className="flex-grow" />
            <button
              style={{
                zIndex: 1000,
                position: "relative",
                pointerEvents: "auto",
              }}
              className="h-full p-1 hover:bg-sky-500"
              onClick={handleClickEdit}
            >
              Ändra
            </button>
            <button
              style={{
                zIndex: 1000,
                position: "relative",
                pointerEvents: "auto",
              }}
              className="h-full p-1 hover:bg-sky-500"
              onClick={handleClickDelete}
            >
              Ta bort
            </button>
          </div>
        </>
      )}
    </div>
  );
}
