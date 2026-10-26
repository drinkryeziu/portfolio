/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { PaperFilters } from "@/components/Paper";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé — Drin Kryeziu",
  description: "Drin Kryeziu, Senior UX/UI and Product Designer: 20+ years across Europe and the United States. Read the résumé or download it as a PDF.",
};

const PDF = "/DrinKryeziu_Resume_05-2026.pdf";
/** Put your photo in /public/images/resume/ and set its path here, e.g. "/images/resume/drin.jpg". */
const PHOTO: string | null = "/images/resume/drin.jpg";

const FONTS =
  "https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap";

const JOBS = [
  {
    title: "Lowe's Taps Kryeziu to Shape Store and Mobile Tools",
    sub: "Senior Product Designer leads flows for millions of shoppers and store associates.",
    where: "Mooresville, N.C. (Remote) — 2024 to present.",
    body: [
      "Kryeziu designs end-to-end flows, wireframes and interactive Figma prototypes for mobile and enterprise apps, and works daily with product managers and engineers on user stories and Agile sprints.",
      "He introduced AI-driven prototyping that cut iteration time, brought UX to Zebra devices used on the store floor, and helps govern a multi-platform design system.",
    ],
  },
  {
    title: "First Bank Unifies Its Acquired Products",
    sub: "As AVP and UX Designer, one experience across many platforms.",
    where: "Charlotte, N.C. — 2023 to 2024.",
    body: [
      "He set the UX strategy that brought several acquired banking products under one consistent, accessible design system, modernized legacy financial apps, and supported the bank's move to the cloud.",
    ],
  },
  {
    title: "Wells Fargo Components Speed Teams by 30%",
    sub: "Senior UX Designer builds the parts others build with.",
    where: "Charlotte, N.C. (Remote) — 2018 to 2023.",
    body: [
      "Working to WFRIA standards and WCAG 2.1 AA, Kryeziu designed enterprise banking apps for more than ten Lines of Business, built 15+ reusable components and mentored junior and mid-level designers.",
    ],
  },
  {
    title: "Charts and Pages for Dimensional Fund Advisors",
    sub: "Senior Production Artist and Graphic Designer.",
    where: "Charlotte, N.C., and Austin, Tex. — 2016 to 2017.",
    body: ["He produced data visualizations, brochures and web-ready assets for financial reports and investor pages, keeping the brand consistent across every channel."],
  },
  {
    title: "Gizmo Designs: Booths, Labels and Mockups",
    sub: "Graphic, Video and UX Designer.",
    where: "Concord, N.C. — 2014 to 2016.",
    body: ["High-fidelity mockups and layouts for client work, plus trade show booths, packaging, product labels and presentations, delivered on tight deadlines."],
  },
  {
    title: "NLB Bank Redesign Lands Three Months Early",
    sub: "Senior UX Lead Designer and Advisor to the VP of Marketing.",
    where: "Prishtina, Kosovo, and Ljubljana, Slovenia — 2008 to 2015.",
    body: [
      "He led the UX/UI redesign of the bank's corporate digital platforms, finishing ahead of schedule and under budget with Agile Scrum, and ran usability testing with staff and clients.",
      "He also supervised the rebranding of 66 branches across Kosovo, coordinating coders, copywriters, designers and bank management.",
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="np">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <PaperFilters />
      <div className="np-age" aria-hidden="true" />

      <div className="np-sheet">
        <div className="np-strip">
          <Link href="/">← Back to the desk</Link>
          <span className="np-hide-sm">Résumé edition · May 2026</span>
          <a href={PDF} download>
            Download the PDF ↓
          </a>
        </div>

        <header className="np-mast">
          <div className="np-ear np-ink">
            <b>All the design</b>that&apos;s fit to print, prototyped and tested.
          </div>
          <h1 className="np-title np-ink">The Kryeziu Chronicle</h1>
          <div className="np-ear np-ink">
            <b>Price: one interview</b>Delivered remote, or in person in the Carolinas.
          </div>
        </header>
        <div className="np-dateline np-ink">
          <span>Vol. XX · No. 2026</span>
          <span>Cornelius, North Carolina</span>
          <span className="np-hide-sm">UX · Product · Design Systems · Accessibility</span>
        </div>

        <section className="np-head np-ink">
          <p className="np-kicker">Special edition: the résumé</p>
          <h2 className="np-h1">Designer Brings Twenty Years of Craft to the Table</h2>
          <p className="np-deck">
            From a bank in Prishtina to Wells Fargo and Lowe&apos;s, Drin Kryeziu has spent two decades turning complex requirements into products people can use.
          </p>
        </section>

        <div className="np-grid">
          <div className="np-col first np-c3 np-left">
            <figure className="np-photo">
              <div className="frame">
                {PHOTO ? <img src={PHOTO} alt="Drin Kryeziu" /> : <span>Portrait to come</span>}
              </div>
              <figcaption className="np-ink">Drin Kryeziu, Senior UX/UI and Product Designer, at work in Cornelius, N.C.</figcaption>
            </figure>
            <div className="np-box np-ink np-numbers">
              <h4>By the numbers</h4>
              <div className="np-num">
                <b>20+</b>
                <span>years designing in Europe and the U.S.</span>
                <b>15+</b>
                <span>reusable components built at Wells Fargo</span>
                <b>~30%</b>
                <span>faster delivery for product teams</span>
                <b>66</b>
                <span>bank branches rebranded in Kosovo</span>
                <b>3 mo.</b>
                <span>ahead of schedule on the NLB redesign</span>
              </div>
            </div>
          </div>

          <article className="np-col np-c6 np-lead">
            <p className="np-by np-ink">By the Chronicle staff · Cornelius, N.C.</p>
            <div className="np-text c2">
              <p className="lead np-drop">
                Drin Kryeziu is a UX/UI and product designer with more than twenty years of international experience across Europe and the United States. His work runs the whole length of a product: user research, wireframes, high-fidelity prototypes and the design systems that hold it all together.
              </p>
              <p>
                Today he delivers enterprise and mobile UX at Lowe&apos;s, after senior roles at Wells Fargo and First Bank. He works in Figma, uses AI-assisted design to move faster, and is at home in Agile and Scrum teams.
              </p>
              <p>
                Colleagues know him as a partner to product managers, engineers and stakeholders, building accessible, scalable products for mobile apps, enterprise platforms, financial services and retail technology.
              </p>
              <p>
                Accessibility is part of the job, not an afterthought: he designs to WCAG 2.1 AA and ADA, governs design systems, and mentors junior designers along the way.
              </p>
              <p>
                Before banking and retail, he trained as a graphic designer, a background that still shows in his work on brand identity, print and data visualization.
              </p>
            </div>
            <blockquote className="np-quote np-ink">
              &ldquo;Twenty years of design leadership across fintech, retail technology, investment management and the public sector.&rdquo;
              <cite>Key achievements, May 2026</cite>
            </blockquote>
          </article>

          <aside className="np-col last np-c3 np-side">
            <div className="np-box np-ink" style={{ marginTop: 0 }}>
              <h4>Read the full record</h4>
              <p style={{ margin: 0, fontSize: 14, textAlign: "center" }}>The complete résumé, with every role, skill and achievement, is available to take home.</p>
              <a className="np-dl" href={PDF} download>
                Download résumé
                <small>PDF · 3 pages · May 2026</small>
              </a>
            </div>
            <div className="np-story np-ink">
              <h3 style={{ fontSize: 20 }}>Educated in Prishtina</h3>
              <p className="sub">Bachelor of Arts, Graphic Design, 2005.</p>
              <p>University of Prishtina, Faculty of Arts, Prishtina, Kosovo.</p>
            </div>
            <div className="np-story np-ink">
              <h3 style={{ fontSize: 20 }}>Also on the record</h3>
              <p>Freelance visual consultant for EU-funded projects in Kosovo and Brussels: visual guidelines, logos, web mockups, templates and training manuals.</p>
            </div>
          </aside>
        </div>

        <h2 className="np-sec np-ink">
          Career <small>Two decades of work, most recent first</small>
        </h2>
        <div className="np-text c3" style={{ paddingTop: 16, textAlign: "left" }}>
          {JOBS.map((j) => (
            <article key={j.title} className="np-story">
              <h3>{j.title}</h3>
              <p className="sub">{j.sub}</p>
              {j.body.map((t, i) => (
                <p key={i}>
                  {i === 0 && <span className="dl">{j.where} </span>}
                  {t}
                </p>
              ))}
            </article>
          ))}
        </div>

        <h2 className="np-sec np-ink">
          Letters to the Editor <small>From people who have worked with him</small>
        </h2>
        <div className="np-letters">
          <section className="np-letter" aria-label="Reference from Ajay Pillai">
            <p className="np-letter-head np-ink">&ldquo;I hit the jackpot with him.&rdquo;</p>
            <div className="np-letter-body">
              <p className="np-drop">
                Ajay Pillai hired Drin as a UX engineer on his Wells Fargo team, and writes that the decision paid off quickly. Drin arrived with a strong portfolio, and Pillai warned him that a large bank leaves little room for creative freedom. Drin took that as a brief rather than a limit: he worked closely with product owners, stayed inside the bank&apos;s design guardrails, and still turned their needs into thoughtful UX and CX designs and prototypes, fast.
              </p>
              <p>
                His work ethic kept development moving at a steady pace, and he held tightly to deadlines. Beyond the craft, Pillai remembers the attitude: positive, eager and can-do, valued not only by him but by everyone on his team. He describes Drin as a joy to work with, and calls his letter only a snapshot of what Drin brings.
              </p>
            </div>
            <p className="np-letter-sign np-ink">
              Ajay Pillai
              <small>Head of Application Architecture · Banking &amp; Insurance Modernization, AI/GenAI, Multi-Cloud, DevSecOps, Scaled Agile</small>
              <small>Drin&apos;s hiring manager at Wells Fargo; they later worked together again at First Bank</small>
            </p>
          </section>
          <section className="np-letter" aria-label="Reference from Fatos Shita">
            <p className="np-letter-head np-ink">&ldquo;His work ethic was exceptional.&rdquo;</p>
            <div className="np-letter-body">
              <p className="np-drop">
                Fatos Shita has known Drin since the late &apos;90s, when each of them ran his own design studio. Even then, he writes, Drin stood out as a deeply knowledgeable designer with an exceptional work ethic. The two collaborated on some projects and traded tips and practices along the way.
              </p>
              <p>
                That trust is why, around 2016–17, Shita recommended Drin for the design team at Dimensional Fund Advisors. Drin settled in quickly, kept financial content true to the firm&apos;s brand guidelines, and carried print and web projects side by side. Shita says he misses Drin&apos;s work ethic, creativity and personality, and the plain joy of working with him.
              </p>
            </div>
            <p className="np-letter-sign np-ink">
              Fatos Shita
              <small>Designer · Drin&apos;s colleague at Dimensional Fund Advisors; ran his own studio alongside Drin&apos;s in the late &apos;90s</small>
            </p>
          </section>
        </div>
        <p className="np-letter-note">Summarized from their reference letters. Contact details available on request.</p>

        <h2 className="np-sec np-ink">
          Classifieds <small>Skills, tools and specialties</small>
        </h2>
        <div className="np-ads">
          <div className="np-ad dark">
            <h5>Wanted</h5>
            <p>Your next product challenge. Experienced designer seeks a team that ships. Write to drinkryeziu@gmail.com.</p>
          </div>
          <div className="np-ad">
            <h5>Design &amp; prototyping</h5>
            <p>Figma, Adobe XD, Axure RP, Balsamiq, iRise, Sketch, Adobe Creative Suite (Photoshop, Illustrator, InDesign).</p>
          </div>
          <div className="np-ad">
            <h5>Practice</h5>
            <p>Product and interaction design, user research, usability testing, information architecture, wireframes, high-fidelity mockups, developer handoff.</p>
          </div>
          <div className="np-ad">
            <h5>Design systems</h5>
            <p>Component libraries, design tokens, governance across mobile, web and enterprise.</p>
          </div>
          <div className="np-ad">
            <h5>Accessibility</h5>
            <p>ADA, WCAG 2.1 AA and Section 508. Inclusive design from the first sketch.</p>
          </div>
          <div className="np-ad">
            <h5>New technology</h5>
            <p>AI-assisted design and rapid prototyping, Figma MCP, generative design workflows.</p>
          </div>
          <div className="np-ad">
            <h5>Teamwork</h5>
            <p>Jira, Confluence, Slack, Miro. Agile and Scrum. Mentorship and design leadership.</p>
          </div>
          <div className="np-ad">
            <h5>Specialties</h5>
            <p>Mobile apps, enterprise UX, retail technology (Zebra), financial services, data visualization.</p>
          </div>
          <div className="np-ad">
            <h5>Also in print</h5>
            <p>Brand identity, print design, video editing and motion graphics.</p>
          </div>
          <div className="np-ad dark">
            <h5>Take a copy</h5>
            <p>
              <a href={PDF} download style={{ color: "inherit", fontWeight: 700 }}>
                Download the résumé as a PDF ↓
              </a>
            </p>
          </div>
        </div>

        <footer className="np-foot np-ink">
          <Link href="/">← Back to the desk</Link>
          <a href="mailto:drinkryeziu@gmail.com">drinkryeziu@gmail.com</a>
          <a href="https://www.linkedin.com/in/drinkryeziu/">LinkedIn</a>
        </footer>
      </div>
    </div>
  );
}
