import type { Metadata } from "next";
import AppScreensPage from "@/components/screens/AppScreensPage";
import type { Screen } from "@/components/screens/ScreensTabs";
import { CODE_BLOCKS } from "@/lib/lundro-code";

export const metadata: Metadata = {
  title: "Lundro screens — Drin Kryeziu",
  description: "Every screen of Lundro Boat Rentals on phone, tablet and desktop.",
};

/** The renter site's top bar wraps to two lines on a phone (165px, so 330px in the 2x capture).
    The boat page bar is shorter; checkout and the owner and admin pages have no pinned bar. */
const SCREENS: Screen[] = [
  { label: "Home", path: "/", file: "home", hdr: 330 },
  { label: "Lake Norman", path: "/lake-norman", file: "lake", hdr: 330 },
  { label: "Search results", path: "/search", file: "search", hdr: 330 },
  { label: "Boat page", path: "/boats/…", file: "boat", hdr: 230 },
  { label: "Checkout", path: "/checkout", file: "checkout", hdr: 0 },
  { label: "Owner sign-up", path: "/owners/signup", file: "ownersignup", hdr: 0 },
  { label: "Owner dashboard", path: "/owner", file: "dashboard", hdr: 0 },
  { label: "Owner calendar", path: "/owner/calendar", file: "calendar", hdr: 0 },
  { label: "Owner bookings", path: "/owner/bookings", file: "bookings", hdr: 0 },
  { label: "Owner earnings", path: "/owner/earnings", file: "earnings", hdr: 0 },
  { label: "Admin review queue", path: "/admin", file: "admin", hdr: 0 },
];

export default function LundroPage() {
  return (
    <AppScreensPage
      app="lundro"
      name="Lundro"
      titleParts={["Lundro", ""]}
      eyebrow="01 — Dev projects / Page 003"
      intro="Boat rentals on North Carolina lakes: a renter site, an owner dashboard and an admin console in one. These are the app's screens with demo data. Scroll inside any screen to see the whole page."
      domain="lundro"
      screens={SCREENS}
      code={CODE_BLOCKS}
    />
  );
}
