import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-barlow" });

export const metadata = {
  title: "FUELX — Fuel Your Everyday Strength",
  description: "FUELX is an Indian nutrition brand making protein bars, protein chips and fruit-based juices."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
