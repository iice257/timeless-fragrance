/* ============================================================
   TIMELESS FRAGRANCE — catalog data. Edit this one file.
   - whatsapp: country code + number, digits only (no + or 0)
   - Each product: id, name, category, vibe, notes, desc, sizes[{label, price}]
   - price: a number in naira, or null to show "Ask for price"
   - Product photo: drop images/products/<id>.jpg (4:5 works best).
     If the file is missing, a branded bottle illustration shows instead.
   - Items marked sample:true are placeholders. Remove that flag once real.
   ============================================================ */
window.CATALOG = {
  brand: {
    name: "Timeless Fragrance",
    tagline: "Every vibe. Every scent.",
    whatsapp: "2348183069193",
    tiktok: "https://www.tiktok.com/@_timelessfragrance",
    tiktokHandle: "_timelessfragrance",
    currency: "₦"
  },
  categories: [
    { id: "perfumes",  label: "Perfumes" },
    { id: "bodysprays", label: "Body sprays" },
    { id: "diffusers", label: "Diffusers" },
    { id: "oils",      label: "Perfume oils" }
  ],
  vibes: ["Soft", "Fresh", "Sweet", "Bold"],
  products: [
    { id: "perfume-soft-floral", sample: true, name: "Soft Floral", category: "perfumes", vibe: "Soft",
      notes: "Peony · Musk · Vanilla", desc: "A gentle, flowery scent for everyday wear.",
      sizes: [{ label: "50ml", price: null }, { label: "100ml", price: null }] },
    { id: "perfume-fresh-citrus", sample: true, name: "Fresh Citrus", category: "perfumes", vibe: "Fresh",
      notes: "Bergamot · Neroli · Cedar", desc: "Clean and bright, made for sunny days.",
      sizes: [{ label: "50ml", price: null }, { label: "100ml", price: null }] },
    { id: "perfume-sweet-amber", sample: true, name: "Sweet Amber", category: "perfumes", vibe: "Sweet",
      notes: "Caramel · Amber · Tonka", desc: "Warm and sweet, the one people ask about.",
      sizes: [{ label: "50ml", price: null }, { label: "100ml", price: null }] },
    { id: "perfume-bold-oud", sample: true, name: "Bold Oud", category: "perfumes", vibe: "Bold",
      notes: "Oud · Leather · Spice", desc: "Deep and confident for evenings out.",
      sizes: [{ label: "50ml", price: null }, { label: "100ml", price: null }] },

    { id: "spray-soft-cotton", sample: true, name: "Soft Cotton", category: "bodysprays", vibe: "Soft",
      notes: "White musk · Cotton flower", desc: "Light mist to freshen up through the day.",
      sizes: [{ label: "200ml", price: null }] },
    { id: "spray-fresh-ocean", sample: true, name: "Fresh Ocean", category: "bodysprays", vibe: "Fresh",
      notes: "Sea salt · Mint · Lemon", desc: "Cool, crisp and easy to love.",
      sizes: [{ label: "200ml", price: null }] },
    { id: "spray-sweet-berry", sample: true, name: "Sweet Berry", category: "bodysprays", vibe: "Sweet",
      notes: "Raspberry · Vanilla · Sugar", desc: "A fruity, sugary mist.",
      sizes: [{ label: "200ml", price: null }] },

    { id: "diffuser-soft-lavender", sample: true, name: "Soft Lavender", category: "diffusers", vibe: "Soft",
      notes: "Lavender · Chamomile", desc: "Calm for the bedroom and living room.",
      sizes: [{ label: "100ml", price: null }, { label: "200ml", price: null }] },
    { id: "diffuser-fresh-linen", sample: true, name: "Fresh Linen", category: "diffusers", vibe: "Fresh",
      notes: "Linen · Green tea", desc: "Makes any room feel freshly cleaned.",
      sizes: [{ label: "100ml", price: null }, { label: "200ml", price: null }] },
    { id: "diffuser-bold-amber", sample: true, name: "Bold Amber", category: "diffusers", vibe: "Bold",
      notes: "Amber · Sandalwood", desc: "A rich, cosy room scent.",
      sizes: [{ label: "100ml", price: null }, { label: "200ml", price: null }] },

    { id: "oil-soft-musk", sample: true, name: "Soft Musk", category: "oils", vibe: "Soft",
      notes: "White musk · Rose", desc: "Alcohol-free oil that stays close to the skin.",
      sizes: [{ label: "10ml", price: null }, { label: "30ml", price: null }] },
    { id: "oil-sweet-vanilla", sample: true, name: "Sweet Vanilla", category: "oils", vibe: "Sweet",
      notes: "Vanilla · Coconut · Praline", desc: "Long-lasting and warm.",
      sizes: [{ label: "10ml", price: null }, { label: "30ml", price: null }] }
  ]
};
