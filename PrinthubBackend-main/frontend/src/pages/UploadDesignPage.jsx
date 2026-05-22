import { useState } from "react";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import UploadForm from "../components/UploadForm";
import { useAppState } from "../hooks/useAppState";
import { uploadDesign as uploadDesignRequest } from "../services/designService";

function UploadDesignPage() {
  const { addUploadedDesign, currentUser } = useAppState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form, reset) => {
    setLoading(true);

    try {
      const uploaded = await uploadDesignRequest(form);
      addUploadedDesign(uploaded);
      toast.success("Design uploaded successfully");
      reset();
    } catch (error) {
      const fallback = {
        _id: `local-${Date.now()}`,
        title: form.title,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        imageUrl: form.image ? URL.createObjectURL(form.image) : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        likes: 0,
        downloads: 0,
        designer: {
          firstName: currentUser?.name?.split(" ")[0] || "Designer",
          lastName: currentUser?.name?.split(" ").slice(1).join(" ") || "User"
        }
      };
      addUploadedDesign(fallback);
      toast.success("Saved locally because upload API is unavailable");
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="max-w-3xl">
          <span className="tag-pill">Upload design</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Publish a new marketplace listing
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Add a preview image, pricing, and packaging description so companies can discover and
            purchase your work.
          </p>
        </div>
        <div className="mt-10">
          <UploadForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </section>
    </PageTransition>
  );
}

export default UploadDesignPage;
