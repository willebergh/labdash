import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { displayName, url, image } = await request.json();

  if (!displayName || !url || !image) {
    return NextResponse.json(
      { message: "Missing values in body" },
      { status: 206 }
    );
  }

  await prisma.service.create({
    data: {
      displayName,
      url,
      image,
    },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
}
