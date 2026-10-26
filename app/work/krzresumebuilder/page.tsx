import type { Metadata } from "next";
import AppScreensPage from "@/components/screens/AppScreensPage";
import type { Screen } from "@/components/screens/ScreensTabs";
import { CODE_BLOCKS } from "@/lib/krzresumebuilder-code";

export const metadata: Metadata = {
  title: "KRZResumeBuilder screens — Drin Kryeziu",
  description: "Every screen of KRZResumeBuilder on phone, tablet and desktop.",
};

/** Public pages have a taller top bar (Sign in + Get started) than signed-in pages. */
const PUBLIC = 138;
const SIGNED_IN = 122;

const SCREENS: Screen[] = [
  { label: "Home", path: "/", file: "home", hdr: PUBLIC },
  { label: "Sign up", path: "/sign-up", file: "signup", hdr: PUBLIC },
  { label: "Create your profile", path: "/onboarding", file: "onboarding", hdr: SIGNED_IN },
  { label: "Professional profile", path: "/profile", file: "profile", hdr: SIGNED_IN },
  { label: "Dashboard", path: "/dashboard", file: "dashboard", hdr: SIGNED_IN },
  { label: "Job match", path: "/jobs/…/match", file: "match", hdr: SIGNED_IN },
  { label: "Tailored resume", path: "/jobs/…?doc=resume", file: "resume", hdr: SIGNED_IN },
  { label: "Cover letter", path: "/jobs/…?doc=cover-letter", file: "cover", hdr: SIGNED_IN },
  { label: "Documents", path: "/documents", file: "documents", hdr: SIGNED_IN },
  { label: "Credits", path: "/credits", file: "credits", hdr: SIGNED_IN },
  { label: "Pricing", path: "/pricing", file: "pricing", hdr: PUBLIC },
];

export default function KRZResumeBuilderPage() {
  return (
    <AppScreensPage
      app="krzresumebuilder"
      name="KRZResumeBuilder"
      titleParts={["KRZResume", "Builder"]}
      eyebrow="01 — Dev projects / Page 001"
      intro="Create your profile once, then tailor a resume and cover letter to every job. These are the app's real screens, captured with a demo profile. Scroll inside any screen to see the whole page."
      appUrl="https://krzresumebuilder.com"
      domain="krzresumebuilder.com"
      screens={SCREENS}
      code={CODE_BLOCKS}
    />
  );
}
