import { Heart, MessageCircleMore, ShoppingBag, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import DesignCard from "../components/DesignCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageTransition from "../components/PageTransition";
import { useAppState } from "../hooks/useAppState";
import { useCart } from "../hooks/useCart";
import { getDesignById, getDesigns } from "../services/designService";

function DesignDetailsPage() {
  const { id } = useParams();
  const { toggleSaveDesign, purchaseDesign, currentUser } = useAppState();
  const { addToCart } = useCart();
  const [design, setDesign] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await getDesignById(id);
      setDesign(result);
      const all = await getDesigns();
      setRelated(all.filter((item) => (item._id || item.id) !== id).slice(0, 3));
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <section className="content-shell py-12">
          <LoadingSkeleton cards={1} />
        </section>
      </PageTransition>
    );
  }

  if (!design) {
    return (
      <PageTransition>
        <section className="content-shell py-16 text-center">
          <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Design not found</h1>
          <Link to="/browse" className="button-primary mt-6">
            Browse Designs
          </Link>
        </section>
      </PageTransition>
    );
  }

  const designerName = design.designer?.firstName
    ? `${design.designer.firstName} ${design.designer.lastName || ""}`.trim()
    : "Label Designer";

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <img src={design.imageUrl} alt={design.title} className="h-full w-full object-cover" />
          </div>

          <div className="surface rounded-[34px] p-8">
            <span className="tag-pill">{design.category}</span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {design.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{design.description}</p>

            <div className="mt-8 grid gap-4 rounded-[24px] border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Designer</p>
                <p className="font-medium text-slate-950 dark:text-white">{designerName}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">${design.price}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Popularity</p>
                <p className="font-medium text-slate-950 dark:text-white">
                  {design.likes} likes · {design.downloads} downloads
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => addToCart(design)} className="button-secondary">
                <ShoppingBag size={16} className="mr-2" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!currentUser) {
                    toast.error("Login as a manufacturing company to purchase");
                    return;
                  }
                  purchaseDesign(design._id || design.id);
                }}
                className="button-primary"
              >
                <ShoppingBag size={16} className="mr-2" />
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={() => toggleSaveDesign(design._id || design.id)}
                className="button-secondary"
              >
                <Heart size={16} className="mr-2" />
                Save Design
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!currentUser) {
                    toast.error("Login to chat with the designer");
                    return;
                  }

                  if (currentUser.role !== "company") {
                    toast.error("Chat with Designer is available for manufacturing company accounts");
                    return;
                  }

                  setChatOpen(true);
                }}
                className="button-secondary"
              >
                <MessageCircleMore size={16} className="mr-2" />
                Chat with Designer
              </button>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(design.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
                  >
                    <Tag size={12} className="mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="tag-pill">Related designs</p>
            <h2 className="section-title mt-4">You may also like</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <DesignCard key={item._id || item.id} design={item} />
          ))}
        </div>
      </section>

      <ChatWindow
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        design={design}
        currentUser={currentUser}
      />
    </PageTransition>
  );
}

export default DesignDetailsPage;
