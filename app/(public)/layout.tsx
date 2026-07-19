import SiteShell from "@/components/layout/siteShell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
