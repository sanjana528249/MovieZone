import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "MovieZone",
  description: "Netflix-style movie streaming platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg-dark text-slate-100">
        <Navbar />
        <main className="pt-20 pb-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

