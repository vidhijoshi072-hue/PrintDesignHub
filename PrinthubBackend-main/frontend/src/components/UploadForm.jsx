import { ImagePlus, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";

const initialState = {
  title: "",
  description: "",
  category: "Food",
  price: "",
  image: null
};

function UploadForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(initialState);

  const preview = useMemo(() => {
    if (!form.image) {
      return "";
    }
    return URL.createObjectURL(form.image);
  }, [form.image]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form, () => setForm(initialState));
      }}
      className="surface rounded-[32px] p-6 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
            <input
              className="input-base"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Modern beverage wrap label"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
            <textarea
              className="input-base min-h-36 resize-y"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Describe the packaging system, format, industry, and brand style."
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Category</label>
              <select
                className="input-base"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              >
                <option>Food</option>
                <option>Cosmetics</option>
                <option>Pharma</option>
                <option>Beverage</option>
                <option>Retail</option>
                <option>Wellness</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Price</label>
              <input
                type="number"
                className="input-base"
                value={form.price}
                min="0"
                onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                placeholder="49"
                required
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50/70 p-5 dark:border-slate-700 dark:bg-slate-900/60">
          <label className="flex h-full cursor-pointer flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white/80 p-6 text-center dark:border-slate-800 dark:bg-slate-950/80">
            {preview ? (
              <img src={preview} alt="Upload preview" className="h-72 w-full rounded-[20px] object-cover" />
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                  <ImagePlus size={26} />
                </div>
                <p className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">Upload design preview</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Drop a JPG or PNG cover image for the marketplace card.
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                setForm((current) => ({ ...current, image: event.target.files?.[0] || null }))
              }
            />
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit" className="button-primary min-w-40" disabled={loading}>
          {loading ? <LoaderCircle size={18} className="mr-2 animate-spin" /> : null}
          {loading ? "Uploading..." : "Publish design"}
        </button>
      </div>
    </form>
  );
}

export default UploadForm;
