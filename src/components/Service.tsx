import { useRouter } from "next/navigation";

import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export default function Service({
  id,
  displayName,
  url,
  image,
  editMode,
  refetch,
}: {
  id: string;
  displayName: string;
  url: string;
  image: string;
  editMode?: boolean;
  refetch?: () => void;
}) {
  const router = useRouter();

  const deleteService = useMutation({
    mutationKey: ["services"],
    mutationFn: () => api.deleteService(id),
    onSuccess: () => refetch?.(),
  });

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
    deleteService.mutate();
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
            className="flex flex-col gap-1 align-items service-non-drag"
          >
            <span className="flex-grow" />
            <button
              className="h-full p-1 hover:bg-sky-500"
              onClick={handleClickEdit}
            >
              Ändra
            </button>
            <button
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
