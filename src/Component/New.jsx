// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   ShoppingBag,
//   ChevronRight,
//   Star,
//   Minus,
//   Plus,
//   Truck,
//   RotateCcw,
//   ShieldCheck,
//   BadgeCheck,
//   RefreshCw,
//   ChevronDown,
//   Check,
//   Ruler,
//   Sparkles,
//   Package,
//   ThumbsUp,
//   ArrowRight,
//   Heart,
// } from "lucide-react";

// import {
//   COLOR_SWATCHES,
//   SIZES,
//   SIZE_CHART,
//   HOW_TO_MEASURE,
//   PRODUCT_FEATURES,
//   WHY_YOU_LOVE,
//   TRUST_BADGES,
//   COMPLETE_THE_LOOK,
//   YOU_MAY_LIKE,
//   RATING_DISTRIBUTION,
//   REVIEWS,
//   TABS,
//   LIFESTYLE_IMAGES,
//   PRODUCT_IMAGES,
//   INR,
// } from "@/lib/product-data";

// // ---------- Breadcrumb ----------
// function Breadcrumb() {
//   return (
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
//       <nav className="flex items-center gap-1.5 text-[12px] text-neutral-500">
//         <a href="#" className="hover:text-neutral-900">HOME</a>
//         <ChevronRight className="h-3 w-3" />
//         <a href="#" className="hover:text-neutral-900">Men</a>
//         <ChevronRight className="h-3 w-3" />
//         <a href="#" className="hover:text-neutral-900">Shirts</a>
//         <ChevronRight className="h-3 w-3" />
//         <span className="text-neutral-900">Premium Cotton Oversized Shirt</span>
//       </nav>
//     </div>
//   );
// }

// // ---------- Star rating ----------
// function Stars({ value, size = 14 }: { value: number; size?: number }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((i) => (
//         <Star
//           key={i}
//           style={{ width: size, height: size }}
//           className={
//             i <= Math.round(value)
//               ? "fill-neutral-900 text-neutral-900"
//               : "fill-neutral-200 text-neutral-200"
//           }
//         />
//       ))}
//     </div>
//   );
// }

// // ---------- Image gallery ----------
// function ImageGallery({ images, alt }: { images: readonly string[]; alt: string }) {
//   const [active, setActive] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const go = (idx: number) => {
//     setDirection(idx > active ? 1 : -1);
//     setActive(idx);
//   };

//   return (
//     <div className="flex gap-3 sm:gap-4">
//       {/* Thumbnails */}
//       <div className="flex flex-col gap-2 sm:gap-3 order-2 sm:order-1">
//         {images.map((img, i) => (
//           <button
//             key={img + i}
//             onClick={() => go(i)}
//             className={`relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-md border transition-all ${
//               active === i
//                 ? "border-neutral-900 ring-1 ring-neutral-900"
//                 : "border-neutral-200 hover:border-neutral-400"
//             }`}
//             aria-label={`View image ${i + 1}`}
//           >
//             <img src={img} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
//           </button>
//         ))}
//       </div>

//       {/* Main image */}
//       <div className="relative order-1 sm:order-2 flex-1 overflow-hidden rounded-lg bg-neutral-100 aspect-[4/5]">
//         <AnimatePresence mode="wait" custom={direction}>
//           <motion.img
//             key={images[active]}
//             src={images[active]}
//             alt={alt}
//             custom={direction}
//             initial={{ opacity: 0, x: direction === 0 ? 0 : direction * 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: direction * -30 }}
//             transition={{ duration: 0.25 }}
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         </AnimatePresence>

//         {/* 360 view pill */}
//         <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-neutral-900 backdrop-blur">
//           <RefreshCw className="h-3.5 w-3.5" />
//           360° View
//         </div>

//         {/* Discount tag */}
//         <div className="absolute top-3 left-3 rounded-md bg-red-600 px-2 py-1 text-[11px] font-bold tracking-wider text-white">
//           -20%
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- Color selector ----------
// function ColorSelector({
//   selected,
//   onSelect,
// }: {
//   selected: string;
//   onSelect: (id: string) => void;
// }) {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-[11px] font-semibold tracking-wider text-neutral-500">
//           COLOR:{" "}
//           <span className="text-neutral-900">
//             {COLOR_SWATCHES.find((c) => c.id === selected)?.label}
//           </span>
//         </span>
//       </div>
//       <div className="flex items-center gap-2.5">
//         {COLOR_SWATCHES.map((c) => (
//           <button
//             key={c.id}
//             onClick={() => onSelect(c.id)}
//             className={`relative h-9 w-9 rounded-full border transition-all ${
//               selected === c.id
//                 ? "ring-2 ring-neutral-900 ring-offset-2 border-transparent"
//                 : "border-neutral-300 hover:border-neutral-500"
//             }`}
//             style={{ background: c.hex }}
//             aria-label={`Select color ${c.label}`}
//           >
//             {selected === c.id && (
//               <Check
//                 className={`absolute inset-0 m-auto h-4 w-4 ${
//                   c.id === "white" ? "text-neutral-900" : "text-white"
//                 }`}
//               />
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ---------- Size selector ----------
// function SizeSelector({
//   selected,
//   onSelect,
//   onOpenGuide,
// }: {
//   selected: string;
//   onSelect: (s: string) => void;
//   onOpenGuide: () => void;
// }) {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-[11px] font-semibold tracking-wider text-neutral-500">
//           SIZE: <span className="text-neutral-900">{selected}</span>
//         </span>
//         <button
//           onClick={onOpenGuide}
//           className="text-[11px] font-medium underline underline-offset-2 text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
//         >
//           <Ruler className="h-3 w-3" /> Size Guide
//         </button>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {SIZES.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSelect(s)}
//             className={`h-10 min-w-[3rem] px-3 text-sm font-medium rounded-md border transition-all ${
//               selected === s
//                 ? "border-neutral-900 bg-neutral-900 text-white"
//                 : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
//             }`}
//           >
//             {s}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ---------- Quantity selector ----------
// function Quantity({
//   value,
//   onChange,
// }: {
//   value: number;
//   onChange: (v: number) => void;
// }) {
//   return (
//     <div>
//       <span className="text-[11px] font-semibold tracking-wider text-neutral-500 block mb-2">
//         QUANTITY
//       </span>
//       <div className="inline-flex items-center border border-neutral-300 rounded-md">
//         <button
//           onClick={() => onChange(Math.max(1, value - 1))}
//           className="h-10 w-10 flex items-center justify-center text-neutral-900 hover:bg-neutral-100 disabled:opacity-40"
//           disabled={value <= 1}
//           aria-label="Decrease quantity"
//         >
//           <Minus className="h-4 w-4" />
//         </button>
//         <span className="w-10 text-center text-sm font-semibold">{value}</span>
//         <button
//           onClick={() => onChange(value + 1)}
//           className="h-10 w-10 flex items-center justify-center text-neutral-900 hover:bg-neutral-100"
//           aria-label="Increase quantity"
//         >
//           <Plus className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ---------- Feature badges ----------
// function FeatureBadges() {
//   const icons = [Sparkles, Package, BadgeCheck, RefreshCw];
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//       {PRODUCT_FEATURES.map((f, i) => {
//         const Icon = icons[i];
//         return (
//           <div
//             key={f.title}
//             className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:border-neutral-400 transition-colors"
//           >
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
//               <Icon className="h-5 w-5 text-neutral-900" />
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-neutral-900">{f.title}</p>
//               <p className="text-xs text-neutral-500">{f.subtitle}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ---------- Trust badges ----------
// function TrustBadges() {
//   const icons = [Truck, RotateCcw, ShieldCheck, BadgeCheck];
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
//       {TRUST_BADGES.map((b, i) => {
//         const Icon = icons[i];
//         return (
//           <div key={b.title} className="flex flex-col items-center text-center p-5 gap-2">
//             <Icon className="h-6 w-6 text-neutral-900" />
//             <p className="text-xs font-bold tracking-wider text-neutral-900">{b.title}</p>
//             <p className="text-xs text-neutral-500">{b.subtitle}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ---------- Tabs ----------
// function TabsSection({ onOpenGuide }: { onOpenGuide: () => void }) {
//   const [active, setActive] = useState(TABS[0].id);
//   const tab = TABS.find((t) => t.id === active)!;

//   return (
//     <div>
//       <div className="flex flex-wrap gap-6 border-b border-neutral-200">
//         {TABS.map((t) => (
//           <button
//             key={t.id}
//             onClick={() => setActive(t.id)}
//             className={`relative pb-3 text-xs font-semibold tracking-wider transition-colors ${
//               active === t.id ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
//             }`}
//           >
//             {t.label}
//             {active === t.id && (
//               <motion.span
//                 layoutId="tab-underline"
//                 className="absolute -bottom-px left-0 right-0 h-0.5 bg-neutral-900"
//               />
//             )}
//           </button>
//         ))}
//       </div>
//       <div className="pt-5">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={active}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             transition={{ duration: 0.2 }}
//           >
//             <p className="text-sm leading-relaxed text-neutral-700 mb-4">{tab.content}</p>
//             <ul className="space-y-2">
//               {tab.bullets.map((b) => (
//                 <li key={b} className="flex items-start gap-2 text-sm text-neutral-700">
//                   <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
//                   <span>{b}</span>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <button
//         onClick={onOpenGuide}
//         className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:underline"
//       >
//         <Ruler className="h-4 w-4" /> View Size Guide
//       </button>
//     </div>
//   );
// }

// // ---------- Size guide modal ----------
// function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-50 bg-black/50"
//           />
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.96, y: 12 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.96, y: 12 }}
//               transition={{ duration: 0.2 }}
//               className="pointer-events-auto w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
//             >
//               <div className="sticky top-0 bg-white flex items-center justify-between border-b border-neutral-200 px-6 py-4">
//                 <h3 className="text-base font-bold tracking-wider">SIZE GUIDE</h3>
//                 <button onClick={onClose} aria-label="Close">
//                   <ChevronDown className="h-5 w-5 rotate-180" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <h4 className="text-xs font-semibold tracking-wider text-neutral-500 mb-3">
//                   SIZE CHART (in cm)
//                 </h4>
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="border-b border-neutral-200 text-left">
//                         <th className="py-2 pr-4 font-semibold">SIZE</th>
//                         <th className="py-2 pr-4 font-semibold">CHEST</th>
//                         <th className="py-2 pr-4 font-semibold">SHOULDER</th>
//                         <th className="py-2 pr-4 font-semibold">LENGTH</th>
//                         <th className="py-2 pr-4 font-semibold">SLEEVE</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {SIZE_CHART.map((row, i) => (
//                         <tr
//                           key={row.size}
//                           className={`border-b border-neutral-100 ${
//                             i % 2 ? "bg-neutral-50" : ""
//                           }`}
//                         >
//                           <td className="py-2 pr-4 font-semibold">{row.size}</td>
//                           <td className="py-2 pr-4">{row.chest}</td>
//                           <td className="py-2 pr-4">{row.shoulder}</td>
//                           <td className="py-2 pr-4">{row.length}</td>
//                           <td className="py-2 pr-4">{row.sleeve}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <h4 className="mt-8 text-xs font-semibold tracking-wider text-neutral-500 mb-4">
//                   HOW TO MEASURE
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {HOW_TO_MEASURE.map((m) => (
//                     <div
//                       key={m.step}
//                       className="flex gap-3 rounded-lg border border-neutral-200 p-4"
//                     >
//                       <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
//                         {m.step}
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-neutral-900">{m.label}</p>
//                         <p className="text-xs text-neutral-600 mt-0.5">{m.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// // ---------- Why you'll love it ----------
// function WhyYouLove() {
//   return (
//     <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
//       <h3 className="text-xs font-bold tracking-wider text-neutral-900 mb-4">
//         WHY YOU&apos;LL LOVE IT
//       </h3>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         {WHY_YOU_LOVE.map((w) => (
//           <li key={w} className="flex items-center gap-2 text-sm text-neutral-800">
//             <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
//               <Check className="h-3 w-3 text-green-700" />
//             </span>
//             {w}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // ---------- Lifestyle gallery ----------
// function LifestyleGallery() {
//   return (
//     <div>
//       <h3 className="text-xs font-bold tracking-wider text-neutral-900 mb-4">
//         LIFESTYLE GALLERY
//       </h3>
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         {LIFESTYLE_IMAGES.map((img, i) => (
//           <motion.div
//             key={img}
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ delay: i * 0.05 }}
//             className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100"
//           >
//             <img
//               src={img}
//               alt={`Lifestyle ${i + 1}`}
//               className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
//             />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ---------- Product card ----------
// function ProductCard({
//   name,
//   price,
//   image,
//   delay = 0,
// }: {
//   name: string;
//   price: number;
//   image: string;
//   delay?: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ delay }}
//       className="group"
//     >
//       <div className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100 mb-3">
//         <img
//           src={image}
//           alt={name}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>
//       <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">{name}</h4>
//       <p className="text-sm font-semibold text-neutral-900 mt-0.5">{INR(price)}</p>
//       <button className="mt-2 w-full h-9 rounded-md border border-neutral-900 text-xs font-semibold tracking-wide text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
//         ADD TO CART
//       </button>
//     </motion.div>
//   );
// }

// // ---------- Complete the look ----------
// function CompleteTheLook() {
//   return (
//     <div>
//       <h3 className="text-xs font-bold tracking-wider text-neutral-900 mb-4">
//         COMPLETE THE LOOK
//       </h3>
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//         {COMPLETE_THE_LOOK.map((p, i) => (
//           <ProductCard key={p.name} {...p} delay={i * 0.05} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ---------- Customer reviews ----------
// function Reviews() {
//   const [sort, setSort] = useState("Recent");
//   return (
//     <div>
//       <h3 className="text-xs font-bold tracking-wider text-neutral-900 mb-6">
//         CUSTOMER REVIEWS
//       </h3>
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Rating summary */}
//         <div className="lg:col-span-4">
//           <div className="flex items-end gap-3 mb-2">
//             <span className="text-5xl font-bold text-neutral-900">4.8</span>
//             <div className="pb-1.5">
//               <Stars value={5} size={16} />
//               <p className="text-xs text-neutral-500 mt-1">Based on 128 reviews</p>
//             </div>
//           </div>
//           <div className="space-y-2 mt-4">
//             {RATING_DISTRIBUTION.map((r) => (
//               <div key={r.stars} className="flex items-center gap-2 text-xs">
//                 <span className="w-3 text-neutral-700">{r.stars}</span>
//                 <Star className="h-3 w-3 fill-neutral-900 text-neutral-900" />
//                 <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-neutral-900 rounded-full"
//                     style={{ width: `${r.percent}%` }}
//                   />
//                 </div>
//                 <span className="w-8 text-right text-neutral-500">{r.percent}%</span>
//               </div>
//             ))}
//           </div>
//           <button className="mt-6 w-full h-10 rounded-md border border-neutral-900 text-xs font-semibold tracking-wide text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
//             WRITE A REVIEW
//           </button>
//         </div>

//         {/* Review cards */}
//         <div className="lg:col-span-8">
//           <div className="flex items-center justify-between mb-4">
//             <p className="text-sm text-neutral-600">Showing 3 of 128 reviews</p>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-neutral-500">Sort:</span>
//               <select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="text-xs border border-neutral-300 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:border-neutral-900"
//               >
//                 <option>Recent</option>
//                 <option>Highest</option>
//                 <option>Lowest</option>
//               </select>
//             </div>
//           </div>
//           <div className="space-y-4">
//             {REVIEWS.map((r, i) => (
//               <motion.div
//                 key={r.name}
//                 initial={{ opacity: 0, y: 12 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ delay: i * 0.05 }}
//                 className="border border-neutral-200 rounded-lg p-4"
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <img
//                     src={r.avatar}
//                     alt={r.name}
//                     className="h-9 w-9 rounded-full object-cover"
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <p className="text-sm font-semibold text-neutral-900">{r.name}</p>
//                       <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
//                         <Check className="h-2.5 w-2.5" /> Verified Buyer
//                       </span>
//                     </div>
//                     <p className="text-[11px] text-neutral-500">{r.date}</p>
//                   </div>
//                   <Stars value={r.rating} />
//                 </div>
//                 <p className="text-sm font-semibold text-neutral-900 mb-1">{r.title}</p>
//                 <p className="text-sm text-neutral-700">{r.body}</p>
//                 <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
//                   <button className="inline-flex items-center gap-1 hover:text-neutral-900">
//                     <ThumbsUp className="h-3.5 w-3.5" /> Helpful
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- You may also like ----------
// function YouMayAlsoLike() {
//   return (
//     <div>
//       <h3 className="text-xs font-bold tracking-wider text-neutral-900 mb-4">
//         YOU MAY ALSO LIKE
//       </h3>
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//         {YOU_MAY_LIKE.map((p, i) => (
//           <ProductCard key={p.name} {...p} delay={i * 0.05} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ---------- Sticky add-to-cart bar (mobile) ----------
// function StickyBar({ onAdd }: { onAdd: () => void }) {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const onScroll = () => setVisible(window.scrollY > 800);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ y: 80 }}
//           animate={{ y: 0 }}
//           exit={{ y: 80 }}
//           transition={{ type: "spring", stiffness: 320, damping: 32 }}
//           className="fixed inset-x-0 bottom-0 z-30 lg:hidden border-t border-neutral-200 bg-white/95 backdrop-blur px-4 py-3"
//         >
//           <div className="flex items-center gap-3">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs text-neutral-500 truncate">Premium Cotton Oversized Shirt</p>
//               <div className="flex items-baseline gap-2">
//                 <span className="text-base font-bold">{INR(1999)}</span>
//                 <span className="text-xs text-neutral-400 line-through">{INR(2499)}</span>
//                 <span className="text-xs font-bold text-red-600">20% OFF</span>
//               </div>
//             </div>
//             <button
//               onClick={onAdd}
//               className="h-11 px-5 rounded-md bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800"
//             >
//               ADD TO CART
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ---------- Toast ----------
// function Toast({ message, show }: { message: string; show: boolean }) {
//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 0, y: -16 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -16 }}
//           className="fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-md bg-neutral-900 text-white text-sm px-4 py-2.5 shadow-lg flex items-center gap-2"
//         >
//           <Check className="h-4 w-4" />
//           {message}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ---------- Product info with synced color state ----------
// function ProductInfoSync({
//   selectedColor,
//   setSelectedColor,
//   onAddToCart,
//   onOpenGuide,
// }: {
//   selectedColor: string;
//   setSelectedColor: (id: string) => void;
//   onAddToCart: () => void;
//   onOpenGuide: () => void;
// }) {
//   const [size, setSize] = useState("M");
//   const [qty, setQty] = useState(1);
//   const [wishlisted, setWishlisted] = useState(false);

//   return (
//     <div className="lg:pl-0">
//       <div className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500 mb-2">
//         MEN&apos;S SHIRTS
//       </div>
//       <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
//         Premium Cotton Oversized Shirt
//       </h1>
//       <div className="flex items-center gap-2 mb-4">
//         <Stars value={4.5} />
//         <span className="text-sm text-neutral-500">(128 Reviews)</span>
//       </div>

//       <div className="flex items-baseline gap-3 mb-1.5">
//         <span className="text-2xl font-bold text-neutral-900">{INR(1999)}</span>
//         <span className="text-lg text-neutral-400 line-through">{INR(2499)}</span>
//         <span className="text-sm font-bold text-red-600">20% OFF</span>
//       </div>
//       <p className="text-xs text-neutral-500 mb-4">Inclusive of all taxes</p>

//       <div className="flex items-center gap-3 mb-6">
//         <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
//           <span className="h-2 w-2 rounded-full bg-green-500" /> In Stock
//         </span>
//         <span className="text-sm text-red-600 font-medium">Only 5 items left</span>
//       </div>

//       <div className="space-y-5">
//         <ColorSelector selected={selectedColor} onSelect={setSelectedColor} />
//         <SizeSelector
//           selected={size}
//           onSelect={setSize}
//           onOpenGuide={onOpenGuide}
//         />
//         <Quantity value={qty} onChange={setQty} />
//       </div>

//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <button
//           onClick={onAddToCart}
//           className="h-12 rounded-md bg-neutral-900 text-white text-sm font-semibold tracking-wide hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
//         >
//           <ShoppingBag className="h-4 w-4" /> ADD TO CART
//         </button>
//         <button
//           onClick={onAddToCart}
//           className="h-12 rounded-md border border-neutral-900 text-neutral-900 text-sm font-semibold tracking-wide hover:bg-neutral-900 hover:text-white active:scale-[0.99] transition-all"
//         >
//           BUY NOW
//         </button>
//       </div>

//       <button
//         onClick={() => setWishlisted(!wishlisted)}
//         className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
//       >
//         <Heart
//           className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`}
//         />
//         {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
//       </button>

//       <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
//         <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 mb-1">
//           <Truck className="h-4 w-4" /> Estimated Delivery
//         </div>
//         <p className="text-sm text-neutral-700">Thu, 15 May – Sat, 17 May</p>
//         <p className="text-xs text-neutral-500 mt-0.5">2-Day Shipping Available</p>
//       </div>
//     </div>
//   );
// }

// // ---------- Page ----------
// export default function Home() {
//   const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
//   const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: "", show: false });
//   const [selectedColor, setSelectedColor] = useState("white");

//   const showToast = (msg: string) => {
//     setToast({ msg, show: true });
//     setTimeout(() => setToast({ msg: "", show: false }), 2200);
//   };

//   const handleAdd = () => {
//     showToast("Added to cart");
//   };

//   const images = PRODUCT_IMAGES[selectedColor as keyof typeof PRODUCT_IMAGES];

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <main className="flex-1">
//         <Breadcrumb />

//         {/* Hero: gallery + info */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             <div className="lg:sticky lg:top-24 lg:self-start">
//               <ImageGallery
//                 key={selectedColor}
//                 images={images}
//                 alt="Premium Cotton Oversized Shirt"
//               />
//             </div>
//             <div>
//               <ProductInfoSync
//                 selectedColor={selectedColor}
//                 setSelectedColor={setSelectedColor}
//                 onAddToCart={handleAdd}
//                 onOpenGuide={() => setSizeGuideOpen(true)}
//               />
//             </div>
//           </div>
//         </section>

//         {/* Feature badges */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-neutral-200">
//           <FeatureBadges />
//         </section>

//         {/* Trust badges */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
//           <TrustBadges />
//         </section>

//         {/* Tabs */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-200">
//           <TabsSection onOpenGuide={() => setSizeGuideOpen(true)} />
//         </section>

//         {/* Why you'll love */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
//           <WhyYouLove />
//         </section>

//         {/* Lifestyle gallery */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-neutral-200">
//           <LifestyleGallery />
//         </section>

//         {/* Complete the look */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-200">
//           <CompleteTheLook />
//         </section>

//         {/* Reviews */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-200">
//           <Reviews />
//         </section>

//         {/* You may also like */}
//         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-200">
//           <YouMayAlsoLike />
//         </section>

//         {/* Final CTA */}
//         <section className="bg-neutral-900 text-white mt-10">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
//             <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
//               Ready to elevate your everyday?
//             </h2>
//             <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
//               Free shipping on orders above ₹999. 30-day easy returns. Premium quality assured.
//             </p>
//             <button
//               onClick={handleAdd}
//               className="inline-flex items-center gap-2 h-12 px-7 rounded-md bg-white text-neutral-900 text-sm font-semibold tracking-wide hover:bg-neutral-100 transition-colors"
//             >
//               ADD TO CART <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* Overlays */}
//       <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
//       <StickyBar onAdd={handleAdd} />
//       <Toast message={toast.msg} show={toast.show} />
//     </div>
//   );
// }