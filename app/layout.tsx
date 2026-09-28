import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jacksonsantosadv.com.br"),
  title: "Jackson Santos | Advogado Previdenciarista · OAB/MG 226.978",
  description:
    "Especialista em Direito Previdenciário. Aposentadorias, BPC/LOAS, Pensão por Morte, Benefícios por Incapacidade e Planejamento Previdenciário. Atendimento humanizado e transparente em São João del-Rei e on-line para todo o Brasil.",
  keywords: [
    "Jackson Santos Advogado",
    "Advogado Previdenciarista São João del Rei",
    "Direito Previdenciário",
    "Aposentadoria INSS",
    "BPC LOAS",
    "Pensão por morte",
    "Planejamento previdenciário",
    "Auxílio Doença",
    "OAB MG 226.978",
    "Benefícios do INSS",
  ],
  authors: [{ name: "Dr. Jackson Santos" }],
  openGraph: {
    title: "Jackson Santos | Advogado Previdenciarista · OAB/MG 226.978",
    description:
      "Orientação jurídica clara, segura e humanizada para garantir seus direitos previdenciários junto ao INSS.",
    url: "https://jacksonsantosadv.com.br",
    siteName: "Jackson Santos Advogado Previdenciarista",
    images: [
      {
        url: "/logo-no-background.png",
        width: 1200,
        height: 630,
        alt: "Jackson Santos Advogado Previdenciarista",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bodyFont.variable} ${displayFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen overflow-x-clip bg-ivory font-sans text-ink antialiased selection:bg-gold-500 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}
