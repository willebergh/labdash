import axios from "axios";

const api = {
  getAllServices: async () => {
    const result = await axios.get("/api/get-all-services");
    return result.data;
  },

  createService: async (displayName: string, url: string, image: string) => {
    const result = await axios.post("/api/service", {
      displayName,
      url,
      image,
    });
    return result.data;
  },

  getService: async (id: string) => {
    const result = await axios.get("/api/service/" + id);
    return result.data;
  },

  updateService: async ({
    id,
    displayName,
    url,
    image,
    gridX,
    gridY,
  }: {
    id: string;
    displayName?: string;
    url?: string;
    image?: string;
    gridX?: number;
    gridY?: number;
  }) => {
    const result = await axios.put("/api/service/" + id, {
      displayName,
      url,
      image,
      gridX,
      gridY,
    });
    return result.data;
  },

  deleteService: async (id: string) => {
    const result = await axios.delete("/api/service/" + id);
    return result.data;
  },
};

export default api;
