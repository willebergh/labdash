"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { default as GridLayout, ItemCallback, Layout } from "react-grid-layout";

import api from "@/lib/axios";
import Service from "@/components/Service";
import { Service as ServiceType } from "prisma/prisma-client";

export default function ServiceGrid({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [width, setWidth] = useState<number>();

  const services = useQuery({
    queryKey: ["services"],
    queryFn: () => api.getAllServices(),
  });

  const updateService = useMutation({
    mutationKey: ["services"],
    mutationFn: (_: { id: string; gridX: number; gridY: number }) =>
      api.updateService(_),
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragStop: ItemCallback = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout,
    placeholder: Layout,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    console.log(element);

    const { i: id, x: gridX, y: gridY } = newItem;
    updateService.mutate({
      id,
      gridX,
      gridY,
    });
  };

  return (
    <>
      {services.isLoading && "Loading"}
      {services.isSuccess && (
        <GridLayout
          className="layout"
          layout={(services.data.services as ServiceType[]).map(
            ({ id, gridX, gridY }) => ({
              i: id,
              x: gridX,
              y: gridY,
              w: 1,
              h: 2,
            })
          )}
          cols={6}
          rowHeight={30}
          width={width || window.innerWidth}
          onLayoutChange={setLayout}
          onDragStop={handleDragStop}
          isDraggable={editMode}
          isResizable={editMode}
          draggableCancel=".service-non-drag"
        >
          {(services.data.services as ServiceType[]).map((service) => (
            <div key={service.id}>
              <Service
                {...service}
                editMode={editMode}
                refetch={() => services.refetch()}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
