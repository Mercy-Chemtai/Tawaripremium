// Usage (from your React project root):
//   node export-products.mjs src/pages/ShopPage.jsx src/pages/ProductDetail.jsx products.json
// Then copy products.json to backend/products/seed_data/products.json
//
// ShopPage is treated as canonical (its slugs/prices are what your links use today).
// ProductDetail only fills gaps (richer specs/features/highlights/gallery).
import fs from "node:fs";

const [shopPath, detailPath, outPath = "products.json"] = process.argv.slice(2);
if (!shopPath || !detailPath) {
  console.error("Usage: node export-products.mjs <ShopPage.jsx> <ProductDetail.jsx> [out.json]");
  process.exit(1);
}

function load(file) {
  const text = fs.readFileSync(file, "utf8");
  const start = text.indexOf("export const dummyProducts =");
  const end = text.indexOf("export default function");
  if (start < 0 || end < 0) throw new Error(`Could not find dummyProducts in ${file}`);
  const literal = text
    .slice(start + "export const dummyProducts =".length, end)
    .trim()
    .replace(/;$/, "");
  return new Function(`return ${literal}`)().filter(Boolean); // drops the sparse hole in ShopPage
}

const size = (v) => (Array.isArray(v) ? v.length : v && typeof v === "object" ? Object.keys(v).length : 0);
const bigger = (a, b) => (size(b) > size(a) ? b : a);

const shop = load(shopPath);
const detail = load(detailPath);
const conflicts = [];
const shopSlugs = new Set(shop.map((x) => x.slug));
const merged = shop.map((p) => {
  // Match by slug first (ids 18/19 are swapped between the two files);
  // fall back to id only for products whose slug was renamed in Detail.
  const d =
    detail.find((x) => x.slug === p.slug) ??
    detail.find((x) => x.id === p.id && !shopSlugs.has(x.slug));
  if (d) {
    for (const f of ["name", "slug", "price", "sale_price", "category_name"]) {
      if (d[f] !== p[f]) conflicts.push(`id ${p.id} ${f}: shop=${JSON.stringify(p[f])} detail=${JSON.stringify(d[f])}`);
    }
  }
  const out = { ...p };
  if (d) {
    out.specifications = bigger(p.specifications, d.specifications ?? d.specs);
    out.features = bigger(p.features, d.features);
    out.highlights = bigger(p.highlights, d.highlights);
    out.gallery = bigger(p.gallery, d.gallery);
    out.colors = bigger(p.colors, d.colors);
    out.storage_options = bigger(p.storage_options, d.storage_options);
  }
  delete out.specs;
  return out;
});

fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));

const remote = merged.filter((p) => JSON.stringify(p).includes("http"));
console.log(`Wrote ${merged.length} products to ${outPath}`);
console.log(`\nShop-vs-Detail conflicts (Shop values were kept): ${conflicts.length}`);
conflicts.forEach((c) => console.log("  " + c));
console.log(`\nProducts priced at 0 (seeded INACTIVE): ${merged.filter((p) => !(p.sale_price || p.price)).map((p) => p.name).join(", ")}`);
if (remote.length) console.log(`\nProducts still using remote image URLs: ${remote.map((p) => p.name).join(", ")}`);
