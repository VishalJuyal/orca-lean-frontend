import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orca Lean",
  description: "Best business solution app provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
