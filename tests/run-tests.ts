import assert from "node:assert/strict";

import { buildProjectCategories } from "../lib/content-utils.ts";

const categories = buildProjectCategories([
  { category: "Web Apps" },
  { category: "Websites" }
]);

assert.deepEqual(categories, ["All", "Web Apps", "Websites"]);

const deduped = buildProjectCategories([
  { category: "Websites" },
  { category: "Websites" },
  { category: "E-commerce" }
]);

assert.deepEqual(deduped, ["All", "Websites", "E-commerce"]);

console.log("All tests passed.");
