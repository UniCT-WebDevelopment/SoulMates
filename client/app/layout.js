import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout"
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soulmates",
  description: "Find your soulmates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
