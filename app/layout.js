import "./globals.css";

import Masthead from "./components/Masthead/Masthead";

export const metadata = {
  title: "CrapR",
  description: "Just a bunch of crap.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Masthead />
        {children}
      </body>
    </html>
  );
}
