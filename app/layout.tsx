import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/app/providers";
import {ClerkProvider} from "@clerk/nextjs";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "HomeAway",
    description: "Fill at home, away form home.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
            <Providers>
                <Navbar/>
                <main className="container py-10">
                    {children}
                </main>
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    );
}
