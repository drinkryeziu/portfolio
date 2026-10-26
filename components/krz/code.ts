/* Faded source code printed behind the KRZResumeBuilder screens (from the app's own repo). */

export const CODE_BLOCKS: { top: number; left?: string; right?: string; rotate: number; code: string }[] = [
  {
    "top": 140,
    "left": "3%",
    "rotate": -1.5,
    "code": "import { labelOf, LABEL_VALUE, type MatchLabel } from \"./scoring\";\nimport type { JobAnalysis, Requirement } from \"./workflows/job-analyzer\";\n\n/**\n * The overall conclusion about how well a candidate fits a job,\n * worked out requirement by requirement.\n * A missing mandatory requirement can never be hidden behind\n * many preferred ones.\n */\nexport const FIT_LEVELS = [\"Excellent fit\", \"Strong fit\", \"Good fit\",\n  \"Partial fit\", \"Weak fit\", \"Insufficient evidence\"] as const;\nexport type FitLevel = (typeof FIT_LEVELS)[number];\n\nexport const STRENGTHS = [\"Strong\", \"Good\", \"Partial\", \"Weak\"] as const;\nexport type Strength = (typeof STRENGTHS)[number];\n\nexport interface FitReport {\n  overall: FitLevel;\n  /** One or two sentences saying why, from the same evidence. */\n  reason: string;\n  mandatory: Strength | null;\n  preferred: Strength | null;\n  professional: Strength | null;\n  industry: Strength | null;\n  technical: Strength | null;\n  evidence: Strength | null;\n  mandatoryGaps: string[];\n}"
  },
  {
    "top": 1180,
    "right": "2%",
    "rotate": 1.0,
    "code": "const strength = (v: number): Strength =>\n  v >= 0.8 ? \"Strong\" : v >= 0.6 ? \"Good\" : v >= 0.35 ? \"Partial\" : \"Weak\";\n\ntype Row = { req: Requirement; label: MatchLabel; a: RequirementAssessment };\n\nfunction avg(rows: Row[]): number | null {\n  return rows.length\n    ? rows.reduce((s, r) => s + LABEL_VALUE[r.label], 0) / rows.length\n    : null;\n}\n\nconst band = (rows: Row[]): Strength | null => {\n  const v = avg(rows);\n  return v === null ? null : strength(v);\n};\n\nexport function computeFit(analysis: JobAnalysis,\n                           assessments: RequirementAssessment[]): FitReport {\n  const byId = new Map(assessments.map((a) => [a.requirementId, a]));\n  const rows: Row[] = analysis.requirements.flatMap((req) => {\n    const a = byId.get(req.id);\n    return a ? [{ req, label: labelOf(a), a }] : [];\n  });"
  },
  {
    "top": 2240,
    "left": "6%",
    "rotate": -0.8,
    "code": "// AI never invents candidate facts.\n// Facts are copied from the profile in code; AI only rewords.\n// Every AI output cites evidence ids and passes the fabrication guard.\n\nexport async function runWorkflow(name, input, user) {\n  await ensureCredits(user, priceOf(name));\n  const reservation = await credits.reserve(user.id, priceOf(name));\n  try {\n    const output = await model(routing[name]).run(input);\n    validate(output);\n    guardAgainstFabrication(output, input.profile);\n    await credits.settle(reservation);\n    return output;\n  } catch (err) {\n    await credits.refund(reservation);\n    throw err;\n  }\n}"
  },
  {
    "top": 3300,
    "right": "4%",
    "rotate": 1.4,
    "code": "export const RULES = {\n  signInIp:   { name: \"signin-ip\",  limit: 20, windowMs: 15 * 60_000 },\n  signUpIp:   { name: \"signup-ip\",  limit: 5,  windowMs: 60 * 60_000 },\n  aiUser:     { name: \"ai-user\",    limit: 40, windowMs: 10 * 60_000 },\n} as const;\n\n/** Addresses, emails and ids are hashed. */\nexport const subjectOf = (value: string) =>\n  createHash(\"sha256\").update(value.trim().toLowerCase())\n    .digest(\"hex\").slice(0, 24);"
  },
  {
    "top": 4400,
    "left": "4%",
    "rotate": -1.2,
    "code": "<PublicHeader aurora />\n<main className=\"aurora\">\n  <h1>Create your profile <em>once.</em> Tailor your application\n      for <em>every job.</em></h1>\n  <p>Paste any job description. KRZResumeBuilder shows how well\n     you match, then writes a resume and cover letter for that job\n     using only what's true about you.</p>\n  <Button href=\"/sign-up\" icon={ArrowRight}>Get started free</Button>\n</main>"
  },
  {
    "top": 5500,
    "right": "3%",
    "rotate": 0.9,
    "code": "export function computeExperience(profile: Profile) {\n  // Overlapping roles are counted once.\n  // Start and end months are both counted.\n  const months = mergeRanges(profile.experiences.map(toRange));\n  return round1(months / 12);\n}"
  },
  {
    "top": 6600,
    "left": "5%",
    "rotate": -1.0,
    "code": "const store = getStore(); // memory or MongoDB, picked by env\nconst user = await requireUser();\nconst job = await store.getJob(user.id, params.jobId);\nif (!job) notFound();\nreturn <JobMatchReport job={job} fit={computeFit(job.analysis, job.assessments)} />;"
  }
];
