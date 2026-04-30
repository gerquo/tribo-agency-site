import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const placeholderHosts = new Set([
  "example.com",
  "www.example.com",
  "linkedin.com",
  "www.linkedin.com",
  "github.com",
  "www.github.com",
  "dribbble.com",
  "www.dribbble.com"
]);

export function isPlaceholderExternalUrl(value?: null | string) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol.startsWith("http") && placeholderHosts.has(url.hostname);
  } catch {
    return false;
  }
}

export function isPlaceholderPhone(value?: null | string) {
  if (!value) {
    return true;
  }

  const digits = value.replace(/\D/g, "");
  return digits.includes("5550194270") || digits.startsWith("1555");
}
