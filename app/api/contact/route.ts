import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  service: z.string().min(1),
  budget: z.string().min(1),
  details: z.string().min(20).max(1200)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Invalid form submission." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase is not configured yet."
      },
      { status: 503 }
    );
  }

  const admin = createSupabaseAdminClient();
  // Prevent accidental rapid duplicate submissions from the same sender.
  const recentDuplicateCheck = await admin
    .from("contact_submissions")
    .select("id")
    .eq("email", parsed.data.email)
    .eq("details", parsed.data.details)
    .gte("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString())
    .limit(1)
    .maybeSingle();

  if (recentDuplicateCheck.data) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "This project brief was already sent recently. Please wait a moment before sending it again."
      },
      { status: 409 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin.from("contact_submissions" as never) as any).insert({
    ...parsed.data,
    status: "new"
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not save your message right now. Please try again in a moment."
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thanks. Your project brief was received and we will reply shortly with a recommended next step."
  });
}
