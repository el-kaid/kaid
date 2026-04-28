import Link from "next/link";

export default function GlobalCtaBar() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="bg-neutral-950/90 backdrop-blur border border-white/15 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-xs md:text-sm text-gray-200">
          Need ERP, data center, or DR guidance?
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/book-demo"
            className="text-xs md:text-sm px-3 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
          >
            Book Demo
          </Link>
          <Link
            href="/updates"
            className="text-xs md:text-sm px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
