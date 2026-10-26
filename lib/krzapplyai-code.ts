/* Faded source code printed behind the KRZApplyAi screens (from the app's prototype). */
import type { CodeBlock } from "@/components/screens/AppScreensPage";

export const CODE_BLOCKS: CodeBlock[] = [
  {
    top: 140,
    left: "3%",
    rotate: -1.5,
    code: `const plans = [
  { id: 'free',  name: 'Free',  price: '$0',  per: 'forever',
    f: ['5 job matches a month', 'CV upload and parsing', '5 job boards'],
    off: ['AI tailoring', 'Auto-apply'] },
  { id: 'basic', name: 'Basic', price: '$19', per: '/month',
    f: ['25 tailored applications', '25 AI cover letters',
        '15 job boards', 'Application dashboard'],
    off: ['Recruiter outreach'] },
  { id: 'pro',   name: 'Pro',   price: '$49', per: '/month', pop: true,
    f: ['200 auto-applications', 'Unlimited AI tailoring',
        '50+ job boards', 'AI mock interviews', '50 recruiter messages'],
    off: [] },
  { id: 'ent',   name: 'Enterprise', price: '$199', per: '/month',
    f: ['Unlimited everything', 'All boards and API',
        'Team management', 'Priority support'],
    off: [] },
];`,
  },
  {
    top: 1180,
    right: "2%",
    rotate: 1,
    code: `const stepNames = ['Personal', 'Links', 'Documents',
                   'AI profile', 'Preferences', 'Launch'];

function step(n) {
  $('ws' + cur).classList.remove('active');
  cur = n;
  $('ws' + n).classList.add('active');
  refreshWizMode();
  if (n === 6) {
    if (editing()) { bill = { view: 'plans', target: user.plan }; renderBilling(); }
    else updateLaunch();
  }
  window.scrollTo(0, 0);
}`,
  },
  {
    top: 2240,
    left: "6%",
    rotate: -0.8,
    code: `function renderMode() {
  const M = MODES[mode];
  const steps = [['search', 'Find matching jobs'],
                 ['file',   'Tailor CV and cover letter'],
                 ['send',   'Submit application']];
  // Automatic: AI does all three, within your rules.
  // Semi-automatic: AI tailors, you approve each send.
  // Manual: AI finds and tailors, you send.
  if (mode === 'auto') {
    const q = pendingOf().length;
    status = autoPaused
      ? \`Auto-send is paused. \${q} applications are queued.\`
      : \`\${sentToday} of 20 sent today · next batch at 3:00 PM\`;
  }
}`,
  },
  {
    top: 3300,
    right: "4%",
    rotate: 1.4,
    code: `// Every token accounted for: search, CV, cover letter, submit.
const ledger = [
  ['Senior UX Designer',         'Spotify', 0.10, 0.45, 0.30, 0.05],
  ['Lead UX Designer',           'Stripe',  0.15, 0.50, 0.35, 0.05],
  ['Principal Product Designer', 'Airbnb',  0.10, 0.55, 0.30, 0.05],
  ['Senior UX Designer',         'Notion',  0.10, 0.40, 0.25, 0.05],
];
const total = ledger.reduce((s, r) => s + r[2] + r[3] + r[4] + r[5], 0);`,
  },
  {
    top: 4400,
    left: "4%",
    rotate: -1.2,
    code: `function applyJob(id) {
  applied.add(id);
  renderJobs();
  toast('Applied to ' + jobs.find(j => j.id === id).company
        + '. CV tailored and sent.');
}

function applyAll() {
  jobs.forEach(j => applied.add(j.id));
  renderJobs();
  toast('Auto-applying to 247 matching jobs');
}`,
  },
  {
    top: 5500,
    right: "3%",
    rotate: 0.9,
    code: `<form class="searchbar" onsubmit="showView('discovery')">
  <input placeholder="What role are you looking for?">
  <input placeholder="City, country or Remote">
  <button class="btn btn-primary">Search</button>
</form>`,
  },
];
