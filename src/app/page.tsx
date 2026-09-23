import Image from "next/image";
import { headers } from "next/headers";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import RepairAnimation from "@/components/RepairAnimation";
import WorkshopCarousel from "@/components/WorkshopCarousel";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import ContactForm from "@/components/ContactForm";
import { FAQItem } from "@/components/FAQAccordion";
import { ArticleAccordionItem } from "@/components/ArticleAccordion";
import { COURSES, getCourseBySlug } from "@/lib/courses";
import { ARTICLES } from "@/lib/knowledgeBase";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";

const REASONS = [
  {
    title: "Expert-Led Training",
    description:
      "Every module is taught by seasoned technicians who have spent years on the bench, so you learn the shortcuts, judgment calls, and troubleshooting instincts that only come from real repair-shop experience.",
  },
  {
    title: "Practical Hands-On Experience",
    description:
      "Spend most of your time working with your own hands, not just watching slides — disassemble, diagnose, and repair real smartphones, tablets, and other devices from day one.",
  },
  {
    title: "Latest Tools & Technology",
    description:
      "Train on the same microscopes, hot-air stations, BGA rework kits, and diagnostic software used in professional service centers, so you're job-ready on modern devices.",
  },
  {
    title: "Certification & Job Assistance",
    description:
      "Walk away with an industry-recognized certificate that proves your skills, plus dedicated placement support to connect you with repair centers and employers who are hiring.",
  },
  {
    title: "Affordable Fees & Flexible Learning",
    description:
      "Get premium, career-focused training without the premium price tag — with flexible batch timings designed to work around students, professionals, and career-switchers alike.",
  },
  {
    title: "Business & Freelancing Guidance",
    description:
      "Beyond repair skills, we teach you how to price jobs, source spare parts, and market yourself — everything you need to open your own repair shop or build a freelance client base.",
  },
];

const ABOUT_SECTIONS = [
  {
    title: "Our Story",
    icon: "📖",
    variant: "float" as const,
    body: "Ultramobiles Training Institute began with a simple observation: as smartphones took over everyday life, skilled repair technicians were falling further and further behind demand. What started as a small workshop has grown into a leading technical training institute specializing in mobile phone repairing, built around one goal — turning complete beginners into confident, employable technicians through genuine hands-on learning rather than theory alone. Over the years, our expertise and commitment to excellence have helped thousands of students step into the industry and build careers they're proud of.",
  },
  {
    title: "Our Mission",
    icon: "🎯",
    variant: "pulse" as const,
    body: "Our mission is to equip aspiring technicians with the practical knowledge, tools, and confidence to repair and service mobile devices to a professional standard. Classrooms alone don't build real technicians, so every course is built around the workbench: we bridge the gap between theoretical learning and real-world application through structured, hands-on training and a curriculum shaped directly by what the repair industry actually needs today.",
  },
  {
    title: "Our Vision",
    icon: "🔭",
    variant: "wiggle" as const,
    body: "We envision a future where a new generation of skilled professionals drives the mobile repair industry forward with innovation, integrity, and expertise. By continuously refining our training programs to keep pace with new devices and technologies, we strive to create real job opportunities, raise the technical standard of the industry, and contribute meaningfully to the technological growth of society.",
  },
];

const GALLERY_IMAGES = [
  "/images/slide1.jpeg",
  "/images/slide2.jpeg",
  "/images/slide3.jpeg",
  "/images/slide5.jpeg",
];

const TESTIMONIALS = [
  {
    name: "Arun K.",
    course: "Basic Mobile Repairing",
    quote:
      "I joined with zero technical background. The hands-on training here gave me the confidence to open my own small repair shop within six months of finishing the course.",
  },
  {
    name: "Priya S.",
    course: "Advanced Mobile Repairing",
    quote:
      "The instructors don't just teach theory — they put real devices in your hands from day one. That practical exposure is what got me hired at a service center right after the course.",
  },
  {
    name: "Karthik M.",
    course: "Chip-Level Training",
    quote:
      "Chip-level work seemed intimidating until I took this course. The micro-soldering training was hands down the best part — I can now handle motherboard repairs other shops turn away.",
  },
];

const FAQS = [
  {
    question: "Do I need any prior technical experience to join?",
    answer:
      "No. Our Basic Mobile Repairing course is designed for complete beginners and starts from the fundamentals. If you already have some experience, you can join directly at the Advanced or Chip-Level stage.",
  },
  {
    question: "How long does each course take to complete?",
    answer:
      "Course length depends on the track you choose and how many days a week you attend — Basic, Advanced, and Chip-Level Training each build on the last. Reach out to us on the Contact section and we'll walk you through the exact schedule.",
  },
  {
    question: "Will I receive a certificate after finishing the course?",
    answer:
      "Yes. Every student who completes a course receives a recognized certificate confirming the skills and training they've completed, which you can use when applying for jobs or advertising your own repair services.",
  },
  {
    question: "Do you help with job placement after training?",
    answer:
      "Yes. Alongside your technical training, we offer job placement support to help connect you with repair centers and employers who are hiring, plus guidance if you'd rather start your own repair business.",
  },
  {
    question: "What tools and equipment will I train on?",
    answer:
      "You'll work hands-on with the same diagnostic tools, microscopes, hot-air rework stations, and soldering equipment used in professional repair shops — all provided on-site, so you don't need to buy your own tools to start.",
  },
  {
    question: "Are batch timings flexible for students and working professionals?",
    answer:
      "Yes, we offer flexible batch timings so you can train around college, a job, or other commitments. Get in touch and we'll help you find a schedule that fits.",
  },
  {
    question: "Can I start my own repair shop after completing a course?",
    answer:
      "Absolutely. Beyond repair skills, we cover the basics of pricing jobs, sourcing spare parts, and marketing yourself, so graduates are equipped to open their own shop or work as a freelance technician, not just get hired.",
  },
  {
    question: "What are the course fees, and can I pay in installments?",
    answer:
      "We keep our training affordable compared to industry standards, and flexible payment options are available. Contact us for current fees for each course and the payment plans we offer.",
  },
];

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const courseJsonLd = COURSES.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/#courses`,
    image: `${SITE_URL}${course.image}`,
    courseMode: "Onsite",
    keywords: course.learn.join(", "),
    provider: {
      "@type": "EducationalOrganization",
      name: BUSINESS.name,
      email: BUSINESS.email,
      telephone: BUSINESS.phone,
      url: SITE_URL,
    },
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLdScript(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />

      {/* HOME */}
      <section id="home" className="scroll-mt-28 border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
          <div className="order-1 lg:order-2">
            <RepairAnimation />
          </div>
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <Reveal>
              <h1 className="text-3xl font-bold text-orange-500 sm:text-4xl">
                Why Should You Join Mobile Service Academy?
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-neutral-700">
                Mobile phones have become the single most essential device in
                everyday life — and every one of them eventually needs a
                skilled hand to fix it. That demand has created a booming,
                recession-proof career path for trained mobile service
                technicians. At Mobile Service Academy, we turn that
                opportunity into a real career by giving you comprehensive,
                hands-on training that takes you from your very first
                screwdriver to confidently repairing flagship smartphones —
                all under the guidance of experienced professionals who have
                been exactly where you are now.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold text-orange-500">
            Here&apos;s why you should join us:
          </h2>
        </Reveal>
        <StaggerGroup className="mt-6 space-y-5">
          {REASONS.map((reason, index) => (
            <StaggerItem key={reason.title} className="flex gap-3">
              <AnimatedIcon
                variant="pulse"
                delay={index * 0.15}
                className="mt-0.5 text-green-600"
              >
                <span aria-hidden>✅</span>
              </AnimatedIcon>
              <p>
                <span className="font-semibold text-neutral-900">
                  {reason.title}
                </span>
                <br />
                <span className="text-neutral-700">{reason.description}</span>
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* COURSES */}
      <section
        id="courses"
        className="scroll-mt-28 border-y border-neutral-200 bg-neutral-50 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
              Our Courses
            </h2>
            <p className="mt-2 text-neutral-600">
              Structured, hands-on training paths from your first repair to
              chip-level expertise.
            </p>
          </Reveal>

          <StaggerGroup className="space-y-10">
            {COURSES.map((course) => (
              <StaggerItem
                key={course.slug}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <div className="relative">
                    <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 45vw, 90vw"
                      />
                    </div>
                    <AnimatedIcon
                      variant={course.variant}
                      className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-2xl shadow-md"
                    >
                      <span aria-hidden>{course.icon}</span>
                    </AnimatedIcon>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-orange-500 sm:text-2xl">
                      {course.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-neutral-700">
                      {course.description}
                    </p>

                    <h4 className="mt-5 font-bold text-orange-500">
                      What You Will Learn:
                    </h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-700">
                      {course.learn.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-orange-600"
                    >
                      Register for This Course →
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-2 text-neutral-600">
              Empowering Students with Technical Skills in Mobile Repairing
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 space-y-6">
            {ABOUT_SECTIONS.map((section) => (
              <StaggerItem
                key={section.title}
                className="group rounded-lg border border-neutral-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <AnimatedIcon
                    variant={section.variant}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-2xl"
                  >
                    <span aria-hidden>{section.icon}</span>
                  </AnimatedIcon>
                  <h3 className="text-xl font-bold text-orange-500">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-neutral-700">
                  {section.body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-orange-500 sm:text-3xl">
              Inside Our Workshop
            </h3>
            <p className="mt-2 text-neutral-600">
              A look at our training floor and the equipment students train
              on every day.
            </p>
          </Reveal>

          <Reveal>
            <WorkshopCarousel images={GALLERY_IMAGES} />
          </Reveal>

          <Reveal className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-orange-500 sm:text-3xl">
              Our Testimonials
            </h3>
            <p className="mt-2 text-neutral-600">
              Reviews from students who trained with us.
            </p>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <StaggerItem
                key={testimonial.name}
                className="flex flex-col rounded-lg border border-neutral-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-3xl text-orange-300" aria-hidden>
                  &ldquo;
                </span>
                <p className="mt-1 flex-1 leading-relaxed text-neutral-700 italic">
                  {testimonial.quote}
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-neutral-100 pt-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                    {testimonial.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.course}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-sm tracking-tight text-amber-500"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* KNOWLEDGE BASE */}
      <section
        id="knowledge-base"
        className="scroll-mt-28 border-y border-neutral-200 bg-neutral-50 py-16"
      >
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
              Knowledge Base
            </h2>
            <p className="mt-2 text-neutral-600">
              Practical guides on common mobile phone problems and how
              they&apos;re diagnosed and repaired.
            </p>
          </Reveal>

          <StaggerGroup className="space-y-4">
            {ARTICLES.map((article) => (
              <StaggerItem key={article.slug}>
                <ArticleAccordionItem
                  article={article}
                  relatedCourse={getCourseBySlug(article.relatedCourseSlug)}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="text-center">
            <AnimatedIcon
              variant="pulse"
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl"
            >
              <span aria-hidden>❓</span>
            </AnimatedIcon>
            <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-neutral-600">
              Answers to what students most often ask before joining.
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <StaggerItem key={faq.question}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-12 text-center text-neutral-600">
            <p>
              Still have a question?{" "}
              <a
                href="#contact"
                className="font-medium text-orange-500 hover:underline"
              >
                Get in touch with us
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-28 border-t border-neutral-200 bg-neutral-50 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <Reveal className="text-center">
            <AnimatedIcon
              variant="float"
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl"
            >
              <span aria-hidden>💬</span>
            </AnimatedIcon>
            <h2 className="text-3xl font-bold text-orange-500 sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-2 text-neutral-600">
              Have a question about our courses, fees, or batch timings? Fill
              out the form below and our team will get back to you shortly.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-orange-500">
                  Visit Us
                </h3>
                <p className="mt-2 flex items-start gap-2 text-neutral-700">
                  <AnimatedIcon
                    as="span"
                    variant="float"
                    delay={0.3}
                    className="inline-block"
                  >
                    <span aria-hidden>📍</span>
                  </AnimatedIcon>
                  19 East, S Car St, Sulur, Tamil Nadu 641402
                </p>
                <a
                  href="https://maps.app.goo.gl/aqF3uMz9qHFzGsNy9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-orange-500 hover:underline"
                >
                  Get directions →
                </a>

                <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-md border border-neutral-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31329.088163208096!2d77.10649251937869!3d11.028419958680905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba855f456e6f09d%3A0xf020e26a08bba78e!2sUltra%20Mobiles%20Training%20Insitute!5e0!3m2!1sen!2sin!4v1787661484101!5m2!1sen!2sin"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ultra Mobiles Training Institute location"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
