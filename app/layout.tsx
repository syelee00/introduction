import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who is 이소연?",
  description: "이소연의 호기심과 취향을 담은 개인 포트폴리오",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <style>{`
          body, input, textarea, button { font-family: "Freesentation", Arial, "Apple SD Gothic Neo", sans-serif !important; }
          .paper-note, .group-heading h2 { font-family: "Gumi Romance", "Freesentation", cursive !important; }
          .dream-section h2, .dream-section h2 em { font-family: "Freesentation", Arial, "Apple SD Gothic Neo", sans-serif !important; font-style: normal; }
          .dream-copy { white-space: pre-line; }
        `}</style>
        {children}
      </body>
    </html>
  );
}
