import "css/tailwind.css";
import "css/main.css";

import type { WithChildren } from "types";

export default function Root({ children }: WithChildren) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
