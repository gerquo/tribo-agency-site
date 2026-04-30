import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { entityFields, entityTables } from "@/lib/supabase/entities";
import { getAdminSession } from "@/lib/supabase/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ entity: string }> }
) {
  const session = await getAdminSession();

  if (!session.user || !session.isAdmin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { entity } = await params;

  if (!(entity in entityTables) || entity === "contact_submissions") {
    return NextResponse.json({ message: "Invalid entity." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const payload = sanitizePayload(
    entity as keyof typeof entityFields,
    body as Record<string, unknown>
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (admin.from(entity as never) as any)
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { message: formatAdminError(error.message, "create") },
      { status: 400 }
    );
  }

  return NextResponse.json({ item: data });
}

function formatAdminError(message: string, action: "create" | "update" | "delete") {
  if (message.toLowerCase().includes("duplicate key")) {
    return "A record with the same unique value already exists.";
  }

  if (action === "create") {
    return "Unable to create this record right now.";
  }

  if (action === "update") {
    return "Unable to update this record right now.";
  }

  return "Unable to delete this record right now.";
}

function sanitizePayload(
  entity: keyof typeof entityFields,
  body: Record<string, unknown>
) {
  return entityFields[entity].reduce<Record<string, unknown>>((payload, field) => {
    const value = body[field];

    if (["published", "featured"].includes(field)) {
      payload[field] = Boolean(value);
      return payload;
    }

    if (["sort_order", "amount"].includes(field)) {
      payload[field] = typeof value === "number" ? value : Number(value ?? 0);
      return payload;
    }

    if (["gallery", "technologies", "results", "features", "includes"].includes(field)) {
      payload[field] = Array.isArray(value)
        ? value
        : String(value ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
      return payload;
    }

    payload[field] = value === "" ? null : value;
    return payload;
  }, {});
}
