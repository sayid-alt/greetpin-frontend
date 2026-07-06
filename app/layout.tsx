
import AuthExpiryWatchers from "../components/AuthExpiryWatchers";
import Providers from "../components/Providers";
import "./globals.css";

export const metadata = {
  title: "EventFlow Dashboard",
  description: "Manage your events seamlessly",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <head>
        {/* Directly inject fonts to completely bypass Next.js font type errors */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link 
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;900&display=swap" 
          rel="stylesheet" 
        /> */}
      </head>
      <body
        className="antialiased bg-[#0c1322] text-[#dce2f7] flex min-h-screen"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <Providers>
          <AuthExpiryWatchers />
          {children}
        </Providers>
      </body>
    </html>
  );
}