import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { mogula, rem } from "./fonts";

export const metadata = {
  title: "ITBX 2024",
  description: "OSKM ITB 2024",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rem.variable} ${mogula.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
