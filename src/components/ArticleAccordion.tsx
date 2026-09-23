"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Article } from "@/lib/knowledgeBase";
import type { Course } from "@/lib/courses";

export function ArticleAccordionItem({
  article,
  relatedCourse,
}: {
  article: Article;
  relatedCourse?: Course;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
          <span aria-hidden>{article.icon}</span>
        </span>
        <span className="flex-1">
          <span className="block text-xs font-semibold tracking-wide text-orange-500 uppercase">
            {article.category}
          </span>
          <span className="block font-semibold text-neutral-900">
            {article.title}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-orange-500"
          aria-hidden
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-5 pb-6 sm:px-6">
              {article.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-neutral-700">
                  {paragraph}
                </p>
              ))}

              {relatedCourse && (
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <p className="text-xs font-semibold text-orange-600 uppercase">
                    Want to learn how to do this yourself?
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {relatedCourse.title}
                  </p>
                  <a
                    href="#courses"
                    className="mt-3 inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  >
                    View Course &amp; Register
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
