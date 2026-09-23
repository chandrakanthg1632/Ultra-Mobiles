export type Article = {
  slug: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  content: string[];
  relatedCourseSlug: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "common-mobile-phone-problems",
    title: "Understanding Common Mobile Phone Problems",
    category: "Repair Basics",
    icon: "📱",
    summary:
      "A quick overview of the issues that bring most phones into a repair shop, and what usually causes them.",
    content: [
      "Most mobile phone complaints fall into a handful of categories: the device won't turn on, the screen is cracked or unresponsive, the battery drains too fast, it won't charge, or an app keeps crashing. Learning to recognize which category a fault belongs to is the first real skill a repair technician builds, because it determines whether you're looking at a hardware problem or a software one.",
      "Hardware issues usually show up as something physically wrong — a shattered display, a swollen battery, a charging port full of lint, or water damage after a drop in the sink. Software issues tend to show up as behavior problems on an otherwise physically fine phone — freezing, slow performance, apps force-closing, or a boot loop.",
      "A methodical technician doesn't just guess. They isolate the symptom, test the affected component or software layer in isolation, and confirm the diagnosis before touching a screwdriver. That diagnostic discipline is exactly what we teach from day one in our Basic Mobile Repairing course.",
    ],
    relatedCourseSlug: "basic-mobile-repairing",
  },
  {
    slug: "cracked-screen-repair-guide",
    title: "Cracked Screen Repair: What to Expect",
    category: "Hardware",
    icon: "🔲",
    summary:
      "How professional screen and display replacements actually work, from diagnosis to reassembly.",
    content: [
      "A cracked screen doesn't always mean the whole display needs replacing — sometimes only the outer glass is damaged while the display underneath still works perfectly. A trained technician checks touch response and display quality first, because that determines whether the repair is a simple glass-only job or a full digitizer and panel replacement.",
      "The repair itself involves carefully heating and prying off the damaged panel without disturbing the internal ribbon cables, cleaning the frame, fitting the new display assembly, and testing touch sensitivity and color accuracy before final reassembly. On modern flagship phones, this also means handling fragile OLED panels and tightly packed internals without damaging nearby components.",
      "This precision work — especially on high-end and flagship devices — is exactly what's covered in our Advanced Mobile Repairing course, alongside the other display and touch-panel techniques modern smartphones demand.",
    ],
    relatedCourseSlug: "advanced-mobile-repairing",
  },
  {
    slug: "battery-draining-fast",
    title: "Battery Draining Fast? Here's Why",
    category: "Hardware",
    icon: "🔋",
    summary:
      "The most common causes of fast battery drain, and how technicians tell a battery problem from a software one.",
    content: [
      "Fast battery drain is one of the most common complaints a repair shop hears, and it isn't always the battery's fault. Background apps, a misbehaving update, or a stuck process can drain a perfectly healthy battery just as fast as a genuinely worn-out one — so the first step is always diagnosis, not replacement.",
      "A worn battery usually shows physical signs over time: the phone gets noticeably warm, the case bulges slightly, or the percentage jumps unexpectedly instead of draining smoothly. Technicians check battery health readings and run a load test to confirm before recommending a replacement.",
      "When replacement is needed, the process involves safely disconnecting the old battery (which can be damaged and require careful handling), fitting a genuine or high-quality replacement, and testing charge and discharge behavior. Battery, speaker, and charging-port replacements like this are core hands-on skills taught in our Basic Mobile Repairing course.",
    ],
    relatedCourseSlug: "basic-mobile-repairing",
  },
  {
    slug: "water-damage-repair-process",
    title: "Water Damage: First Steps and Repair Process",
    category: "Hardware",
    icon: "💧",
    summary:
      "What to do in the first few minutes after a phone gets wet, and how professional water-damage repair works.",
    content: [
      "The first few minutes after a phone gets wet matter more than almost anything a repair shop can do afterward. Powering the device off immediately, avoiding the temptation to charge it, and not aggressively shaking or heating it (rice does very little) all reduce the chance of corrosion spreading through the board.",
      "In the shop, water-damage repair starts with fully disassembling the device and inspecting the motherboard under magnification for corrosion, especially around the charging port, battery connector, and any exposed connectors. Affected areas are cleaned with isopropyl alcohol and an ultrasonic cleaner where needed, and any corroded components are identified for repair or replacement.",
      "Because water damage can affect dozens of tiny components at once, it's one of the trickier diagnoses in the trade — and it's covered directly in our Advanced Mobile Repairing course alongside the other in-depth troubleshooting techniques flagship devices demand.",
    ],
    relatedCourseSlug: "advanced-mobile-repairing",
  },
  {
    slug: "charging-port-issues",
    title: "Charging Port Issues and How They're Fixed",
    category: "Hardware",
    icon: "🔌",
    summary:
      "Why phones stop charging properly, and what a charging-port repair actually involves.",
    content: [
      "A phone that charges intermittently, only at certain cable angles, or not at all usually points to one of three things: a damaged charging port, a faulty charging cable or adapter, or a software-level charging issue. Ruling out the cable and adapter first saves a lot of unnecessary disassembly.",
      "If the port itself is the problem, it's often simpler than people expect — lint and debris build-up is one of the most common causes and can sometimes be cleared without any parts replacement. When the port's pins are bent or worn from years of cable insertion, though, the full connector needs to be desoldered and replaced.",
      "This is precision, hands-on work that combines careful disassembly with basic soldering — exactly the kind of practical skill built into our Basic Mobile Repairing course.",
    ],
    relatedCourseSlug: "basic-mobile-repairing",
  },
  {
    slug: "software-vs-hardware-problems",
    title: "Software vs Hardware Problems: How to Tell the Difference",
    category: "Diagnostics",
    icon: "🧭",
    summary:
      "A practical framework technicians use to figure out whether a fault is in the software or the hardware.",
    content: [
      "Before opening a single screw, a good technician tries to rule software in or out. Booting into safe mode, checking whether the issue persists after a factory reset (on a backed-up device), and testing whether the symptom follows the SIM card, the account, or the physical device are all quick ways to narrow things down.",
      "Hardware problems tend to be consistent and physical — the same crash happens under the same physical condition, like pressure on a spot on the case, or heat. Software problems tend to follow the software: they show up after an update, only in one app, or disappear after a reset.",
      "This diagnostic mindset is the foundation of everything else in mobile repair, and it's the very first thing we build in students during the Basic Mobile Repairing course before moving on to hands-on hardware work.",
    ],
    relatedCourseSlug: "basic-mobile-repairing",
  },
  {
    slug: "what-is-chip-level-repair",
    title: "What Is Chip-Level Repair?",
    category: "Advanced Repair",
    icon: "🔬",
    summary:
      "An introduction to motherboard-level diagnostics — the kind of repair most shops can't do, and specialists can.",
    content: [
      "Most repairs replace a whole part — a screen, a battery, a charging port module. Chip-level repair is different: instead of swapping a module, the technician diagnoses and repairs the individual components on the motherboard itself, tracing a fault down to a single IC, capacitor, or broken trace.",
      "This requires reading circuit diagrams and PCB layouts, using a multimeter and thermal imaging to find short circuits, and performing micro-soldering and hot-air rework precise enough to remove and replace components smaller than a grain of rice — all without damaging the dozens of other components packed onto the same board.",
      "Because so few technicians have these skills, chip-level repair is where a lot of the highest-value, highest-margin repair work lives — the jobs most shops have to turn away. It's the entire focus of our Chip-Level Training course.",
    ],
    relatedCourseSlug: "chip-level-training",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
