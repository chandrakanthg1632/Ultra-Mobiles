import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
        <span aria-hidden>🔧</span>
      </span>
      <h1 className="mt-6 text-3xl font-bold text-orange-500 sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-neutral-600">
        We couldn&apos;t find the page you were looking for. It may have been
        moved, or the link might be broken.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-orange-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Back to Home
        </Link>
        <Link
          href="/#contact"
          className="rounded-md border border-neutral-300 px-6 py-2.5 font-semibold text-neutral-700 transition-colors hover:border-orange-500 hover:text-orange-500"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
