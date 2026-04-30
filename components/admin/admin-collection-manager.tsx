"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePenLine, Loader2, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldType = "text" | "textarea" | "checkbox" | "tags" | "number";

type FieldConfig = {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
};

type ItemRecord = Record<string, unknown> & {
  id: string;
};

export function AdminCollectionManager({
  entity,
  title,
  description,
  fields,
  initialItems,
  previewFields
}: {
  entity:
    | "projects"
    | "services"
    | "testimonials"
    | "team_members"
    | "trusted_brands"
    | "homepage_stats"
    | "pricing_packages"
    | "pricing_factors"
    | "pricing_estimator_options";
  title: string;
  description: string;
  fields: FieldConfig[];
  initialItems: ItemRecord[];
  previewFields: string[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [createLoading, setCreateLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const defaultValues = useMemo(() => {
    return fields.reduce<Record<string, string | boolean>>((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? true : "";
      return acc;
    }, {});
  }, [fields]);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateLoading(true);
    setStatus(null);
    const payload = formToPayload(new FormData(event.currentTarget), fields);

    const response = await fetch(`/api/admin/${entity}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await readResponse(response);
    setCreateLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: data.message ?? "Unable to save item." });
      return;
    }

    if (!data.item) {
      setStatus({ type: "error", message: "The server did not return the saved item." });
      return;
    }

    const createdItem = data.item;

    event.currentTarget.reset();
    setItems((current) => [createdItem, ...current]);
    setExpandedId(createdItem.id);
    setStatus({ type: "success", message: "Item created successfully." });
    router.refresh();
  }

  async function handleUpdate(
    event: React.FormEvent<HTMLFormElement>,
    itemId: string
  ) {
    event.preventDefault();
    setEditingId(itemId);
    setStatus(null);
    const payload = formToPayload(new FormData(event.currentTarget), fields);

    const response = await fetch(`/api/admin/${entity}/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await readResponse(response);
    setEditingId(null);

    if (!response.ok) {
      setStatus({ type: "error", message: data.message ?? "Unable to update item." });
      return;
    }

    if (!data.item) {
      setStatus({ type: "error", message: "The server did not return the updated item." });
      return;
    }

    const updatedItem = data.item;

    setItems((current) =>
      current.map((item) => (item.id === itemId ? updatedItem : item))
    );
    setStatus({ type: "success", message: "Item updated successfully." });
    router.refresh();
  }

  async function handleDelete(itemId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setEditingId(itemId);
    setStatus(null);
    const response = await fetch(`/api/admin/${entity}/${itemId}`, {
      method: "DELETE"
    });
    const data = await readResponse(response);
    setEditingId(null);

    if (!response.ok) {
      setStatus({ type: "error", message: data.message ?? "Unable to delete item." });
      return;
    }

    setItems((current) => current.filter((item) => item.id !== itemId));
    setExpandedId((current) => (current === itemId ? null : current));
    setStatus({ type: "success", message: "Item deleted successfully." });
    router.refresh();
  }

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
          {title}
        </p>
        <h1 className="mt-3 text-3xl font-black">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        {status ? (
          <p
            className={`mt-5 rounded-md border p-3 text-sm font-medium ${
              status.type === "success"
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-destructive/20 bg-destructive/10 text-destructive"
            }`}
          >
            {status.message}
          </p>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleCreate}>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                formId="create"
                value={defaultValues[field.name]}
              />
            ))}
          </div>
          <div>
            <Button type="submit" disabled={createLoading}>
              {createLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Add item
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className="grid gap-5">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <p className="text-lg font-bold">No records yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add the first item above to populate this section in the admin dashboard.
            </p>
          </div>
        ) : null}

        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {String(item.title ?? item.name ?? item.role ?? "Item")}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {previewFields.map((field) => (
                    <span
                      key={field}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {field}: {renderPreview(item[field])}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setExpandedId((current) => (current === item.id ? null : item.id))
                  }
                >
                  <FilePenLine className="h-4 w-4" />
                  {expandedId === item.id ? "Hide editor" : "Edit"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(item.id)}
                  disabled={editingId === item.id}
                >
                  {editingId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {expandedId === item.id ? (
              <form className="mt-5 grid gap-4" onSubmit={(event) => handleUpdate(event, item.id)}>
                <div className="grid gap-4 md:grid-cols-2">
                  {fields.map((field) => (
                    <FieldRenderer
                      key={`${item.id}-${field.name}`}
                      field={field}
                      formId={item.id}
                      value={normalizeValue(item[field.name], field.type)}
                    />
                  ))}
                </div>
                <div>
                  <Button type="submit" size="sm" disabled={editingId === item.id}>
                    {editingId === item.id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Saving
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> Save changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function FieldRenderer({
  field,
  formId,
  value
}: {
  field: FieldConfig;
  formId: string;
  value: string | boolean | undefined;
}) {
  const isChecked = Boolean(value);
  const inputId = `${formId}-${field.name}`;

  if (field.type === "textarea") {
    return (
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor={inputId}>{field.label}</Label>
        <Textarea
          id={inputId}
          name={field.name}
          defaultValue={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-md border border-input px-3 py-3 text-sm font-medium">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={isChecked}
          className="h-4 w-4 accent-[hsl(var(--primary))]"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={inputId}>{field.label}</Label>
      <Input
        id={inputId}
        name={field.name}
        type={field.type === "number" ? "number" : "text"}
        defaultValue={typeof value === "string" ? value : ""}
        placeholder={field.placeholder}
      />
    </div>
  );
}

function formToPayload(formData: FormData, fields: FieldConfig[]) {
  return fields.reduce<Record<string, unknown>>((payload, field) => {
    if (field.type === "checkbox") {
      payload[field.name] = formData.get(field.name) === "on";
      return payload;
    }

    const rawValue = String(formData.get(field.name) ?? "").trim();

    if (field.type === "tags") {
      payload[field.name] = rawValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      return payload;
    }

    if (field.type === "number") {
      payload[field.name] = rawValue === "" ? "" : Number(rawValue);
      return payload;
    }

    payload[field.name] = rawValue;
    return payload;
  }, {});
}

function normalizeValue(value: unknown, type?: FieldType) {
  if (type === "checkbox") {
    return Boolean(value);
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "number") {
    return String(value);
  }

  return typeof value === "string" ? value : "";
}

function renderPreview(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value ?? "");
}

async function readResponse(response: Response) {
  const data = await response.json().catch(() => null);

  if (data && typeof data === "object" && "message" in data) {
    return data as { message?: string; item?: ItemRecord };
  }

  return {};
}
