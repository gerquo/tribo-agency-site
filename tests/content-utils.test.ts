import test from "node:test";
import assert from "node:assert/strict";

import { buildProjectCategories } from "../lib/content-utils";

test("buildProjectCategories always includes All first", () => {
  const categories = buildProjectCategories([
    { category: "Web Apps" },
    { category: "Websites" }
  ]);

  assert.deepEqual(categories, ["All", "Web Apps", "Websites"]);
});

test("buildProjectCategories removes duplicate categories", () => {
  const categories = buildProjectCategories([
    { category: "Websites" },
    { category: "Websites" },
    { category: "E-commerce" }
  ]);

  assert.deepEqual(categories, ["All", "Websites", "E-commerce"]);
});
