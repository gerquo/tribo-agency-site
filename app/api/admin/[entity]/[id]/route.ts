import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { entityFields } from "@/lib/supabase/entities";
import { getAdminSession } from "@/lib/supabase/auth";

export async function PATCH(
  request: Request,
  {
    params
  }: {
    params: Promise<{ entity: string; id: string }>;
  }
) {
  const session = await getAdminSession();

  if (!session.user || !session.isAdmin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { entity, id } = await params;

  if (!(entity in entityFields)) {
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
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { message: formatAdminError(error.message, "update") },
      { status: 400 }
    );
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(
  _request: Request,
  {
    params
  }: {
    params: Promise<{ entity: string; id: string }>;
  }
) {
  const session = await getAdminSession();

  if (!session.user || !session.isAdmin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { entity, id } = await params;

  if (!(entity in entityFields)) {
    return NextResponse.json({ message: "Invalid entity." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin.from(entity as never) as any).delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: formatAdminError(error.message, "delete") },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}

function formatAdminError(message: string, action: "update" | "delete") {
  if (message.toLowerCase().includes("duplicate key")) {
    return "A record with the same unique value already exists.";
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
