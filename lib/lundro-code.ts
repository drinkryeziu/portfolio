/* Faded source code printed behind the Lundro screens (from the app's prototype). */
import type { CodeBlock } from "@/components/screens/AppScreensPage";

export const CODE_BLOCKS: CodeBlock[] = [
  {
    top: 140,
    left: "3%",
    rotate: -1.5,
    code: `// id, title, area, guests, half, full, rating, reviews, captain, self, instant
var R = [
  ['b1', "24' Bennington Pontoon",   'Cornelius',    12, 350,  600, 4.9, 38, 1, 1, 1],
  ['b2', "22' MasterCraft XT22",     'Mooresville',  14, 525,  950, 4.8, 21, 1, 1, 1],
  ['b3', "25' Sun Tracker Party Barge", 'Davidson',  13, 395,  700, null, 0, 1, 1, 0],
  ['b4', "23' Barletta Tritoon",     'Huntersville', 12, 450,  800, 5.0, 12, 1, 0, 1],
  ['b5', "21' Malibu Wakesetter",    'Mooresville',  12, 560, 1000, 4.7, 44, 1, 0, 0],
  ['b7', "26' Harris Grand Mariner", 'Cornelius',    14, 575, 1050, 4.9, 63, 1, 0, 1],
];`,
  },
  {
    top: 1180,
    right: "2%",
    rotate: 1,
    code: `function quote() {
  var b = B(S.boat), boatP = S.len === 'half' ? b.h : b.f;
  var hrs = (S.len === 'half' ? 4 : 8) + (S.q.hour || 0);
  var cap = S.cap && b.cap ? 50 * hrs : 0;
  var fee = r2((boatP + ex + cap) * 0.10);
  // NC: boat time at 3% (capped), rented gear at 4.75% + county + transit
  var st = r2(Math.min(boatTime * 0.03, 1500) + gear * 0.0475);
  var co = r2(gear * 0.02), tr = r2(gear * 0.015);
  var exempt = S.org && (S.orgType === 'federal' || S.orgType === 'state');
  if (exempt) { st = co = tr = 0; }
  return { total: r2(boatP + ex + cap + fee + st + co + tr), exempt: exempt };
}`,
  },
  {
    top: 2240,
    left: "6%",
    rotate: -0.8,
    code: `// Contact details stay inside Lundro until a trip is booked.
mask: function (t) {
  var hid = false;
  var r = String(t)
    .replace(/[\\w.+-]+@[\\w-]+\\.[\\w.-]+/g, function () { hid = true; return '[email hidden]'; })
    .replace(/(?:https?:\\/\\/|www\\.)\\S+/gi, function () { hid = true; return '[link hidden]'; });
  return { text: r, hidden: hid };
}`,
  },
  {
    top: 3300,
    right: "4%",
    rotate: 1.4,
    code: `var NAV = ['Overview', 'Calendar', 'Bookings', 'Boats', 'Extras',
           'Customers', 'Messages', 'Earnings', 'Reviews',
           'Verification', 'Settings'];`,
  },
  {
    top: 4400,
    left: "4%",
    rotate: -1.2,
    code: `function filtered() {
  return R.filter(function (b) {
    if (b.g < S.guests) return false;
    if (f.capf === 'captain' && !b.cap) return false;
    if (f.capf === 'self' && !b.self) return false;
    if (f.tube && b.ex.indexOf('tube') < 0) return false;
    return true;
  });
}`,
  },
  {
    top: 5500,
    right: "3%",
    rotate: 0.9,
    code: `<h1>Your day on the lake starts here</h1>
<p>Rent pontoons, ski boats and more from verified local owners.
   See the full price, tax included, before you pay.</p>`,
  },
];
