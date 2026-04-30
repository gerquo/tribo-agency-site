import { PageTransitionShell } from "@/components/page-transition-shell";

export default function Template({
  children
}: {
  children: React.ReactNode;
}) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
