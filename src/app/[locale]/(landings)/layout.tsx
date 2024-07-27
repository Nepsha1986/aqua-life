export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main style={{ flexGrow: 1 }}>{children}</main>;
}
