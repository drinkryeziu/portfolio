import type { Metadata } from "next";
import AppScreensPage from "@/components/screens/AppScreensPage";
import type { Screen } from "@/components/screens/ScreensTabs";
import { CODE_BLOCKS } from "@/lib/krzapplyai-code";

export const metadata: Metadata = {
  title: "KRZApplyAi screens — Drin Kryeziu",
  description: "Every screen of KRZApplyAi on phone, tablet and desktop.",
};

/** The app's top bar is 60px tall on every page (120px in the 2x phone captures). */
const HDR = 120;

const SCREENS: Screen[] = [
  { label: "Home", path: "/", file: "home", hdr: HDR },
  { label: "Sign up", path: "/signup", file: "signup", hdr: HDR },
  { label: "Profile 1 · Personal", path: "/profile", file: "personal", hdr: HDR },
  { label: "Profile 2 · Links", path: "/profile", file: "links", hdr: HDR },
  { label: "Profile 3 · Documents", path: "/profile", file: "documents", hdr: HDR },
  { label: "Profile 4 · AI profile", path: "/profile", file: "aiprofile", hdr: HDR },
  { label: "Profile 5 · Preferences", path: "/profile", file: "preferences", hdr: HDR },
  { label: "Profile 6 · Launch", path: "/profile", file: "launch", hdr: HDR },
  { label: "Job discovery", path: "/jobs", file: "jobs", hdr: HDR },
  { label: "Dashboard", path: "/dashboard", file: "dashboard", hdr: HDR },
  { label: "Token credits", path: "/pricing", file: "pricing", hdr: HDR },
];

export default function KRZApplyAiPage() {
  return (
    <AppScreensPage
      app="krzapplyai"
      name="KRZApplyAi"
      titleParts={["KRZApply", "Ai"]}
      eyebrow="01 — Dev projects / Page 002"
      intro="Upload your CV once. KRZApplyAi finds matching roles, tailors your CV and cover letter for each one, and applies while you sleep. These are the app's screens with a demo profile. Scroll inside any screen to see the whole page."
      appUrl="https://applyai-eight.vercel.app"
      domain="applyai-eight.vercel.app"
      screens={SCREENS}
      code={CODE_BLOCKS}
    />
  );
}
