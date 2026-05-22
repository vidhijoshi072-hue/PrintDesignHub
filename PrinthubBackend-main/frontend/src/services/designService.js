import api from "./api";
import { mockDesigns } from "./mockData";

const normalizeDesign = (design) => ({
  ...design,
  id: design._id || design.id,
  designerId: design.designerId || design.designer?._id || design.designer?.id || "designer-unknown",
  industry: design.industry || design.category || "Marketplace",
  likes: design.likes ?? Math.floor(100 + Math.random() * 200),
  downloads: design.downloads ?? Math.floor(200 + Math.random() * 500),
  tags: design.tags ?? [design.category || "Label", "Print", "Marketplace"]
});

export const getDesigns = async (filters = {}) => {
  try {
    const { data } = await api.get("/design/all", {
      params: {
        category: filters.category !== "All" ? filters.category : undefined,
        minPrice: filters.price?.[0] ?? undefined,
        maxPrice: filters.price?.[1] ?? undefined
      }
    });

    if (!Array.isArray(data) || data.length === 0) {
      return mockDesigns;
    }

    return data.map(normalizeDesign);
  } catch (error) {
    return mockDesigns;
  }
};

export const getDesignById = async (id) => {
  try {
    const { data } = await api.get(`/design/${id}`);
    return normalizeDesign(data.design || data);
  } catch (error) {
    const designs = await getDesigns();
    return designs.find((design) => (design._id || design.id) === id) || null;
  }
};

export const uploadDesign = async (payload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append("price", payload.price);

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await api.post("/design/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return normalizeDesign(data.design || data);
};
