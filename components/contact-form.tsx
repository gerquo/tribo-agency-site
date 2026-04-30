"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  TriangleAlert
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Please enter a company or organization."),
  service: z.string().min(1, "Choose a service."),
  budget: z.string().min(1, "Choose a budget range."),
  details: z
    .string()
    .min(20, "Tell us a little more about the project.")
    .max(1200, "Please keep the details under 1200 characters.")
});

type ContactValues = z.infer<typeof contactSchema>;
type FormState = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      details: ""
    }
  });

  async function onSubmit(values: ContactValues) {
    setStatus("idle");
    setSubmitMessage(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setStatus("error");
      setSubmitMessage(
        data?.message || "Something went wrong. Please try again or email us directly."
      );
      return;
    }

    setStatus("success");
    setSubmitMessage(
      data?.message ||
        "Thanks. Your project brief was received and we will reply shortly with a recommended next step."
    );
    reset();
  }

  return (
    <Reveal
      as="div"
      y={18}
      amount={0.14}
      className="rounded-lg border border-border bg-card p-5 shadow-premium sm:p-8"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-7 border-b border-border pb-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" />
            Secure project inquiry
          </div>
          <h3 className="mt-4 text-2xl font-black tracking-tight">
            Request a strategy call
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The more context you share, the better we can recommend scope,
            timeline, and next steps.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" fieldId="contact-name" error={errors.name?.message}>
            <Input
              id="contact-name"
              placeholder="Alex Morgan"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
          </Field>
          <Field label="Email" fieldId="contact-email" error={errors.email?.message}>
            <Input
              id="contact-email"
              placeholder="alex@company.com"
              type="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </Field>
          <Field
            label="Company/Organization"
            fieldId="contact-company"
            error={errors.company?.message}
          >
            <Input
              id="contact-company"
              placeholder="Acme Studio"
              aria-invalid={Boolean(errors.company)}
              {...register("company")}
            />
          </Field>
          <Field
            label="Service needed"
            fieldId="contact-service"
            error={errors.service?.message}
          >
            <Controller
              control={control}
              name="service"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="contact-service" aria-invalid={Boolean(errors.service)}>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Custom Software">Custom Software</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Brand + Strategy">Brand + Strategy</SelectItem>
                    <SelectItem value="Audit + Optimization">Audit + Optimization</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Budget range" fieldId="contact-budget" error={errors.budget?.message}>
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="contact-budget" aria-invalid={Boolean(errors.budget)}>
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GH₵5k-GH₵15k">GH₵5k-GH₵15k</SelectItem>
                    <SelectItem value="GH₵15k-GH₵50k">GH₵15k-GH₵50k</SelectItem>
                    <SelectItem value="GH₵50k-GH₵120k">GH₵50k-GH₵120k</SelectItem>
                    <SelectItem value="GH₵120k+">GH₵120k+</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Project details"
              fieldId="contact-details"
              error={errors.details?.message}
            >
              <Textarea
                id="contact-details"
                placeholder="What are you building, who is it for, and what should success look like?"
                aria-invalid={Boolean(errors.details)}
                {...register("details")}
              />
            </Field>
          </div>
        </div>

        {status === "success" ? (
          <p className="mt-5 flex items-start gap-2 rounded-md border border-primary/20 bg-primary/10 p-3 text-sm font-medium text-primary">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {submitMessage}
          </p>
        ) : null}

        {status === "error" ? (
          <p className="mt-5 flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {submitMessage}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              Send Project Brief <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Reveal>
  );
}

function Field({
  label,
  fieldId,
  error,
  children
}: {
  label: string;
  fieldId: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={fieldId}>{label}</Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
