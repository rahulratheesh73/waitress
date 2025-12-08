// ...existing code...
"use client";

import Image from "next/image";
import menuImage from "@/public/menu.jpg";
import combosImage from "@/public/combos.jpg";
import specialImage from "@/public/special.jpg";
import favouriteImage from "@/public/favourite.jpg";
import { useEffect, useMemo, useState } from "react";

type Category = "breakfast" | "lunch" | "dinner" | "combos";

type Item = {
  id: string;
  name: string;
  price: number;
  image?: any;
  category: Category;
  recommended?: boolean;
  tag?: string;
};

const ITEMS: Item[] = [
  { id: "b1", name: "Pancake Stack", price: 6.5, image: menuImage, category: "breakfast", recommended: true, tag: "Easy" },
  { id: "b2", name: "Breakfast Burrito", price: 7.0, image: menuImage, category: "breakfast", tag: "Protein" },
  { id: "l1", name: "Classic Burger", price: 8.5, image: menuImage, category: "lunch", recommended: true, tag: "Popular" },
  { id: "l2", name: "Caesar Salad", price: 7.5, image: menuImage, category: "lunch", tag: "Light" },
  { id: "d1", name: "Steak Dinner", price: 16.5, image: specialImage, category: "dinner", recommended: true, tag: "Chef’s" },
  { id: "d2", name: "Grilled Salmon", price: 14.0, image: specialImage, category: "dinner", tag: "Healthy" },
  { id: "c1", name: "Best Combo Meal", price: 12.0, image: combosImage, category: "combos", tag: "Value" },
  { id: "c2", name: "Family Combo", price: 20.0, image: combosImage, category: "combos", tag: "Share" },
  { id: "f1", name: "Customer Favourite", price: 9.0, image: favouriteImage, category: "lunch", tag: "Top" },
];

const SECTION_MAP: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "Browse All" },
  { key: "breakfast", label: "Morning Fuel" },
  { key: "lunch", label: "Midday Meals" },
  { key: "dinner", label: "Evening Feast" },
  { key: "combos", label: "Power Combos" },
];

export default function ModernMenuUI() {
  // auto-detect time to set a friendly default
  const defaultSection = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) return ("breakfast" as Category | "all");
    if (hour < 16) return ("lunch" as Category | "all");
    if (hour < 22) return ("dinner" as Category | "all");
    return ("combos" as Category | "all");
  }, []);

  const [section, setSection] = useState<Category | "all">(defaultSection);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [query, setQuery] = useState("");
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false);

  useEffect(() => {
    // subtle entrance animation class toggle (optional)
    const root = document.documentElement;
    root.style.setProperty("--card-shadow", "0 6px 18px rgba(20,20,20,0.06)");
  }, []);

  const visibleItems = useMemo(() => {
    const base = section === "all" ? ITEMS : ITEMS.filter((i) => i.category === section);
    const filtered = base.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()));
    return showOnlyRecommended ? filtered.filter((f) => f.recommended) : filtered;
  }, [section, query, showOnlyRecommended]);

  const selected = ITEMS.filter((i) => (counts[i.id] || 0) > 0);

  function inc(id: string) {
    setCounts((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }
  function dec(id: string) {
    setCounts((c) => {
      const next = Math.max(0, (c[id] || 0) - 1);
      return { ...c, [id]: next };
    });
  }
  function reset() {
    setCounts({});
  }
  function confirmSelection() {
    const order = selected.map((s) => ({ name: s.name, qty: counts[s.id], price: s.price }));
    console.log("Customer selection:", order);
    alert(`Selected ${order.length} item(s). Check console for details.`);
  }

  const total = selected.reduce((sum, s) => sum + (counts[s.id] || 0) * s.price, 0);

  // smart suggestions: top recommended in the current section, falling back to global
  const suggestions = useMemo(() => {
    const inSection = ITEMS.filter((it) => it.recommended && (section === "all" || it.category === section));
    if (inSection.length) return inSection.slice(0, 6);
    return ITEMS.filter((it) => it.recommended).slice(0, 6);
  }, [section]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <header className="relative mb-10 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 p-8 shadow-xl text-white overflow-hidden">
  <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-3xl"></div>
  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">AI Menu Assistant</h1>
    <p className="mt-2 text-base md:text-lg opacity-90">Tell me how you feel, and I’ll pick the perfect dish for you.</p>

    <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search or type: 'I want something spicy'"
        className="w-full sm:w-80 rounded-xl px-5 py-3 text-sm text-slate-800 shadow-lg focus:outline-none"
      />
      <button
        onClick={() => alert('AI Suggestion Logic Coming Soon')} 
        className="rounded-xl px-6 py-3 text-sm font-semibold bg-white text-orange-600 shadow-xl hover:scale-[1.03] transition"
      >Ask AI 🔥</button>
    </div>
  </div>
</header>

        <nav className="mb-6 flex flex-wrap gap-3">
          {SECTION_MAP.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key as Category | "all")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition shadow-sm ${
                section === s.key
                  ? "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg"
                  : "bg-white text-slate-700 border"
              }`}
              aria-pressed={section === s.key}
            >
              <span className="hidden sm:inline-block text-xs opacity-80">{s.label}</span>
              <span className="sm:hidden">{s.label.split(" ")[0]}</span>
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 sm:hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="rounded-full border px-3 py-1 text-sm"
            />
          </div>
        </nav>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article key={item.id} className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-[var(--card-shadow)] transition-transform hover:scale-[1.01]">
              <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2">
                {item.recommended && <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">Top</span>}
                {item.tag && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{item.tag}</span>}
              </div>

              <div className="flex h-full flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-lg font-semibold text-slate-900">${item.price.toFixed(2)}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(item.id)} aria-label={`Decrease ${item.name}`} className="rounded-md bg-slate-100 px-3 py-1 text-sm">-</button>
                        <div className="min-w-[36px] text-center font-medium" aria-live="polite">{counts[item.id] || 0}</div>
                        <button onClick={() => inc(item.id)} aria-label={`Increase ${item.name}`} className="rounded-md bg-orange-500 px-3 py-1 text-white">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <button onClick={() => setCounts((c) => ({ ...c, [item.id]: (c[item.id] || 0) + 1 }))} className="rounded-full bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 text-sm font-medium text-white shadow">Add</button>
                  <button className="text-sm text-slate-500">Details</button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Suggestions */}
        <aside className="mt-8 rounded-2xl bg-white p-4 shadow-[var(--card-shadow)]">
          <h4 className="mb-3 text-lg font-semibold text-slate-900">Suggestions {section !== "all" ? `for ${SECTION_MAP.find(s => s.key === section)?.label}` : ''}</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {suggestions.map((sug) => (
              <div key={sug.id} className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3 text-center">
                <div className="relative h-20 w-full overflow-hidden rounded-md">
                  <Image src={sug.image} alt={sug.name} fill className="object-cover" />
                </div>
                <div className="text-sm font-medium text-slate-800">{sug.name}</div>
                <div className="text-xs text-slate-500">${sug.price.toFixed(2)}</div>
                <button onClick={() => inc(sug.id)} className="mt-2 rounded-full bg-white px-3 py-1 text-sm border">Add</button>
              </div>
            ))}
          </div>
        </aside>

        {/* Selection summary */}
        <section className="mt-8 rounded-2xl bg-white p-4 shadow-[var(--card-shadow)]">
          <h4 className="mb-3 text-lg font-semibold text-slate-900">Your Selection</h4>

          {selected.length === 0 ? (
            <p className="text-sm text-slate-500">No items selected yet. Tap + on an item to add it.</p>
          ) : (
            <ul className="space-y-3">
              {selected.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{s.name} x {counts[s.id]}</div>
                    <div className="text-sm text-slate-500">${((counts[s.id] || 0) * s.price).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => dec(s.id)} className="rounded-md bg-slate-100 px-3 py-1">-</button>
                    <button onClick={() => inc(s.id)} className="rounded-md bg-orange-500 px-3 py-1 text-white">+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Estimated total</div>
              <div className="text-2xl font-semibold text-slate-900">${total.toFixed(2)}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={reset} className="rounded-md border px-4 py-2">Reset</button>
              <button onClick={confirmSelection} className="rounded-md bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 text-white">Confirm</button>
            </div>
          </div>
        </section>

        {/* Floating cart for quick access */}
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
          <div className="flex items-center gap-4 rounded-full bg-white px-5 py-3 shadow-lg">
            <div className="text-sm text-slate-500">Order</div>
            <div className="text-lg font-semibold text-slate-900">${total.toFixed(2)}</div>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="rounded-full bg-orange-500 px-4 py-2 text-white">View</button>
          </div>
        </div>

      </div>
    </main>
  );
}
// ...existing code...
