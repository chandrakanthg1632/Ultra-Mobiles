"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { BUSINESS } from "@/lib/site";

const WHATSAPP_NUMBER = BUSINESS.phone.replace(/^\+/, "");

// A synthetic <a target="_blank"> click is what browsers — including mobile
// Safari/Chrome — treat most reliably as "open this in a new tab": unlike
// window.open(), it's indistinguishable from a real link click, so it's not
// subject to popup-blocking, and it never touches/navigates the current tab
// (window.open() can, inconsistently, end up doing that on some browsers).
function openInNewTab(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const COURSES = [
  "Basic Mobile Repairing",
  "Advanced Mobile Repairing",
  "Chip-Level Training",
];

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const mobile = String(data.get("mobile") ?? "");
    const address = String(data.get("address") ?? "");
    const course = String(data.get("course") ?? "");

    const whatsappMessage = [
      "New enquiry from the Ultra Mobiles website:",
      `Name: ${name}`,
      `Email: ${email}`,
      `Mobile: ${mobile}`,
      address ? `Address: ${address}` : null,
      `Interested course: ${course || "—"}`,
    ]
      .filter(Boolean)
      .join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Opened synchronously, tied directly to this click, before the current
    // tab does anything else — it always opens a new tab and never touches
    // this one, so the fetch below and the success screen work exactly the
    // same regardless of whether the new tab succeeds.
    openInNewTab(whatsappUrl);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, address, course }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "Something went wrong sending your message. Please try again, or call us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border border-neutral-200 p-8 text-center shadow-sm"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
            className="mb-3 inline-block text-4xl"
            aria-hidden
          >
            ✅
          </motion.span>
          <p className="text-lg font-semibold text-neutral-900">
            Thank you for reaching out!
          </p>
          <p className="mt-2 text-neutral-700">
            We&apos;ve received your details and will get back to you shortly.
            We also opened WhatsApp with your details filled in — just tap
            Send there to reach us instantly.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm font-medium text-orange-500 hover:underline"
          >
            Submit another response
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-lg border border-neutral-200 p-6 shadow-sm sm:p-8"
        >
          <motion.div variants={fieldVariants}>
            <label htmlFor="name" className="mb-1 block font-medium text-neutral-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 transition-shadow focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="email" className="mb-1 block font-medium text-neutral-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 transition-shadow focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="mobile" className="mb-1 block font-medium text-neutral-900">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 transition-shadow focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="address" className="mb-1 block font-medium text-neutral-900">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 transition-shadow focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            />
          </motion.div>

          <motion.fieldset variants={fieldVariants}>
            <legend className="mb-1 font-medium text-neutral-900">
              Select Course
            </legend>
            <div className="space-y-2">
              {COURSES.map((course) => (
                <label key={course} className="flex items-center gap-2 text-neutral-700">
                  <input
                    type="radio"
                    name="course"
                    value={course}
                    className="h-4 w-4 accent-orange-500"
                  />
                  {course}
                </label>
              ))}
            </div>
          </motion.fieldset>

          {error && (
            <motion.p
              variants={fieldVariants}
              className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            variants={fieldVariants}
            whileHover={submitting ? undefined : { scale: 1.02 }}
            whileTap={submitting ? undefined : { scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-orange-500 py-3 font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Sending…" : "Submit"}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
