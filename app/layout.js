import "./globals.css";

import Masthead from "./components/Masthead/Masthead";
import Navbar from "./components/Navbar/Navbar";

import { getSessions } from "@/app/actions";

export const metadata = {
  title: "CrapR",
  description: "Just a bunch of crap.",
};

export default async function RootLayout({ children }) {

  let token = await getSessions();

  return (
    <html lang="en">
      <body>
        <Masthead />
        <nav>
          <Navbar token={token} />
        </nav>
        {children}
      </body>
    </html>
  );
}
