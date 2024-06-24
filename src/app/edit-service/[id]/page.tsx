"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import api from "@/lib/axios";
import Button from "@/components/Button";

export default function CreateServicePage() {
  const [displayName, setDisplayName] = useState<string>("");
  const [displayNameError, setDisplayNameError] = useState<boolean>(false);

  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<boolean>(false);

  const [image, setImage] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!displayName) {
      setDisplayNameError(true);
    }

    if (!image) {
      setImageError(true);
    }

    if (!url) {
      setUrlError(true);
    }

    if (!displayName || !url || !image) {
      return;
    }

    await api
      .createService(displayName, url, image)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setErrorMessage("Något gick fel.");
      });
  };

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      api.getService(params.id).then((data) => {
        const { displayName, url, image } = data.service;
        setDisplayName(displayName);
        setUrl(url);
        setImage(image);
      });
    }
  }, [params?.id]);

  return (
    <div
      style={{ height: "100vh" }}
      className="flex flex-row justify-center items-center"
    >
      <form onSubmit={handleSubmit} className="flex flex-col w-2/5 gap-8">
        <h1 className="text-lg">Lägg till tjänst</h1>
        <input
          placeholder="Display Name"
          className={`p-4 border border-${
            displayNameError ? "red-500" : "black"
          }`}
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value || "");
            setDisplayNameError(false);
          }}
        />
        <input
          placeholder="URL"
          className={`p-4 border border-${urlError ? "red-500" : "black"}`}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value || "");
            setUrlError(false);
          }}
        />
        <input
          placeholder="Image Url"
          className={`p-4 border border-${imageError ? "red-500" : "black"}`}
          value={image}
          onChange={(e) => {
            setImage(e.target.value || "");
            setImageError(false);
          }}
        />

        {errorMessage !== "" && <span>{errorMessage}</span>}
        <Button type="submit">Spara</Button>
      </form>
    </div>
  );
}
