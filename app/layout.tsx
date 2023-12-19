"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { LocalProvider } from "@/components/common/LocalProvider";
import ConvexClientProvider from "@/components/convexProvider/ConvexClientComponent";
import "./globals.css";
import { Inter } from "next/font/google";

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
                <LocalProvider>
                    <body
                        className={`${inter.className} bg-customLight flex flex-col w-full h-full`}
                        >
                        {children}
                    </body>
                </LocalProvider>
                </ConvexClientProvider>
            </Provider>
        </html>
    );
}
