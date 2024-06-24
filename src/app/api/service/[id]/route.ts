import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ message: "Missing id" }, { status: 206 });
  }

  const service = await prisma.service.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!service) {
    return NextResponse.json(
      {
        message: "Could not find service.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      message: "success",
      service,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { displayName, url, image, gridX, gridY } = await request.json();

  if (!id) {
    return NextResponse.json(
      { message: "Missing id in body" },
      { status: 200 }
    );
  }

  await prisma.service.update({
    where: {
      id,
    },
    data: {
      displayName,
      url,
      image,
      gridX,
      gridY,
    },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Missing values in body" },
      { status: 206 }
    );
  }

  await prisma.service.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
}
