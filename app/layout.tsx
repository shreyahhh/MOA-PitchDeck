import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mall of America Sales Tool",
  description: "Interactive multi-section sales presentation shell for MOA.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googlevideo.com" />
        {[
          "/brand/nick.mp4",
          "/brand/lego.mp4",
          "/brand/mm.mp4",
          "/brand/toysrus-trim.mp4",
          "/brand/burberry.mp4",
          "/brand/givenchy.mp4",
          "/brand/gucci.mp4",
          "/brand/prada.mp4",
          "/brand/valentino.mp4",
          "/brand/nike.mp4",
          "/brand/apple.mp4",
          "/brand/lululemon.mp4",
          "/brand/nordstrom.mp4",
        ].map((href) => (
          <link key={href} rel="preload" href={href} as="video" type="video/mp4" />
        ))}
      </head>
      <body className={`${inter.className} min-h-full bg-white text-[#0D1F3C]`}>
        {children}
      </body>
    </html>
  );
}
