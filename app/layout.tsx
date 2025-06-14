"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ConvexClientProvider from "@/components/convexProvider/ConvexClientComponent";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Provider store={store}>
                <ConvexClientProvider>
                    <body
                        className={`${inter.className} bg-customLight flex flex-col w-full h-full`}
                    >
                         {/* GoatCounter script should go here or inside <head> via next/head */}
                        <Script
                        data-goatcounter="https://nephrite-damath.goatcounter.com/count"
                        async
                        src="//gc.zgo.at/count.js"
                        />
                        {children}
                    </body>
                </ConvexClientProvider>
            </Provider>
        </html>
    );
}
