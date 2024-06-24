"use client";

import { useEffect, useState } from "react";
import { default as GridLayout, ItemCallback, Layout } from "react-grid-layout";

import api from "@/lib/axios";
import Service from "@/components/Service";
import { Service as ServiceType } from "prisma/prisma-client";

export default function ServiceGrid({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    api.getAllServices().then((data) => {
      setServices(data.services);
    });

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLayout(
      services.map(({ id, gridX, gridY }) => ({
        i: id,
        x: gridX,
        y: gridY,
        w: 1,
        h: 2,
      }))
    );
  }, [services]);

  const handleDragStop: ItemCallback = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout,
    placeholder: Layout,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    console.log(element);

    const { i, x, y } = newItem;
    api
      .updateService({
        id: i,
        gridX: x,
        gridY: y,
      })
      .then(() => {
        console.log("updated");
      })
      .catch(() => {
        setLayout([...layout].map((_) => (_.i === i ? oldItem : _)));
      });
  };

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={6}
      rowHeight={30}
      width={width || window.innerWidth}
      onLayoutChange={setLayout}
      onDragStop={handleDragStop}
      isDraggable={editMode}
      isResizable={editMode}
    >
      {services.map((service) => (
        <div key={service.id}>
          <Service {...service} editMode={editMode} />
        </div>
      ))}
    </GridLayout>
  );
}
