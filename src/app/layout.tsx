import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MSWComponent } from "./_component/MSWComponent";
import AuthSession from "./_component/AuthSession"; // 로그인 유무 확인

const inter = Inter({ subsets: ["latin"] });
type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Z. 무슨 일이 일어나고 있나요? / Z",
  description: "Z.com inspired by X.com",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        <AuthSession>{children}</AuthSession> 
      </body>
    </html>
  );
}
