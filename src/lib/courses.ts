export type CourseVariant = "pulse" | "wiggle" | "spin";

export type Course = {
  slug: string;
  title: string;
  image: string;
  icon: string;
  variant: CourseVariant;
  summary: string;
  description: string;
  learn: string[];
};

export const COURSES: Course[] = [
  {
    slug: "basic-mobile-repairing",
    title: "Basic Mobile Repairing",
    image: "/images/course-basic.webp",
    icon: "🛠️",
    variant: "pulse",
    summary:
      "Perfect for complete beginners — learn mobile phone hardware, software, and everyday repair fundamentals through hands-on practice.",
    description:
      "Never picked up a screwdriver on a phone before? Perfect. Our Basic Mobile Service Training course is built from the ground up for complete beginners, walking you step by step through the fundamentals of mobile phone hardware and software. You'll learn how a phone is actually put together, how to methodically diagnose common faults, and how to fix the issues that make up the vast majority of everyday repair jobs — all through structured, hands-on practice rather than theory alone.",
    learn: [
      "Introduction to mobile phone components and tools",
      "Identifying and fixing common hardware and software problems",
      "Battery, speaker, microphone, and charging port replacements",
      "Basic soldering and component handling techniques",
      "Understanding mobile operating systems and software troubleshooting",
      "Safety measures and best practices in mobile repair",
    ],
  },
  {
    slug: "advanced-mobile-repairing",
    title: "Advanced Mobile Repairing",
    image: "/images/course-advanced.webp",
    icon: "⚡",
    variant: "wiggle",
    summary:
      "For technicians ready to tackle flagship devices, intermittent faults, and precision hardware and software repairs.",
    description:
      "Ready to move beyond the basics? The Advanced Mobile Service Training course is built for technicians who already understand phone repair fundamentals and want to confidently tackle the harder jobs — flagship devices, intermittent faults, and the repairs that keep less-experienced technicians stuck. You'll dive into in-depth troubleshooting methodology, precision hardware and software repairs, and the specific techniques modern high-end smartphones demand.",
    learn: [
      "Advanced hardware troubleshooting for flagship devices",
      "Micro-soldering and precision repair techniques",
      "Screen, display, and touch panel replacement for high-end phones",
      "Water-damage diagnosis and repair",
      "Software flashing, unlocking, and IMEI repairing",
      "Motherboard IC reballing and chipset-level repair",
    ],
  },
  {
    slug: "chip-level-training",
    title: "Chip-Level Training",
    image: "/images/course-chip.webp",
    icon: "🔬",
    variant: "spin",
    summary:
      "Master motherboard-level diagnostics and micro-soldering to fix the circuit-level faults most shops turn away.",
    description:
      "This is where real specialists are made. Our Chip-Level Training course is designed for technicians who want to master the motherboard itself — diagnosing and fixing the circuit-level faults that most repair shops have to turn away. You'll learn to read a board like a map, trace faults down to individual components, and carry out the kind of precision micro-soldering work that commands premium repair rates.",
    learn: [
      "Understanding PCB layouts and circuit diagrams",
      "Diagnosing and replacing faulty IC components",
      "Micro-soldering and hot air rework techniques",
      "EEPROM programming and BIOS chip repair",
      "Power section troubleshooting and short-circuit fixing",
      "Flashing, unlocking, and bootloader repair",
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}
