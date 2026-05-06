import TdeeCalculator from "./tdee-calculator";
import {
  contextualLinks,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  faqItems,
  futureCalculatorRoutes,
  jsonLdIds,
  practicalExamples,
  seoSections,
  SITE_NAME,
  SITE_URL,
  socialProfiles,
} from "./seo";

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": jsonLdIds.webApplication,
  name: "TDEE Calculator With Macros",
  url: SITE_URL,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "A free browser-based fitness calculator for estimating TDEE, maintenance calories, cutting calories, bulking calories, BMI, and protein, carbs, and fat macros.",
  isPartOf: {
    "@id": jsonLdIds.website,
  },
  publisher: {
    "@id": jsonLdIds.organization,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": jsonLdIds.faq,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": jsonLdIds.breadcrumb,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "TDEE Calculator With Macros",
      item: SITE_URL,
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": jsonLdIds.organization,
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: socialProfiles,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": jsonLdIds.website,
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webApplicationSchema,
            faqSchema,
            breadcrumbSchema,
            organizationSchema,
            websiteSchema,
          ]),
        }}
      />
      <main className="relative px-3 py-4 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl">
          <TdeeCalculator />

          <div className="mx-auto mt-3 grid max-w-5xl gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3" aria-label="Advertisements">
            <div className="flex h-14 items-center justify-center rounded-2xl border border-[#d8d0c5] bg-white/55 text-xs font-bold uppercase tracking-[0.22em] text-[#7b7369] shadow-sm backdrop-blur sm:h-16">
              Advertisement
            </div>
            <div className="flex h-14 items-center justify-center rounded-2xl border border-[#d8d0c5] bg-white/55 text-xs font-bold uppercase tracking-[0.22em] text-[#7b7369] shadow-sm backdrop-blur sm:h-16">
              Advertisement
            </div>
          </div>

          <section className="mt-8 rounded-[1.35rem] border border-white/70 bg-white/70 p-4 shadow-result backdrop-blur-xl sm:mt-10 sm:rounded-[2rem] sm:p-7">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2f6f5f]">Fitness calculator guide</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[#20251f] sm:text-4xl">
                TDEE calculator with macros
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)] sm:text-base">{DEFAULT_DESCRIPTION}</p>
              <p className="mt-3 text-sm leading-6 text-[#5d685f]">
                Use the results as a connected starting point for{" "}
                {contextualLinks.map((link, index) => (
                  <span key={link.href}>
                    <a className="font-bold text-[#2f6f5f] underline-offset-4 transition hover:underline" href={link.href}>
                      {link.label}
                    </a>
                    {index < contextualLinks.length - 1 ? ", " : " "}
                  </span>
                ))}
                and future fitness tools.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {seoSections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-[#d8d0c5] bg-white/55 p-4">
                  <h3 className="text-lg font-bold text-[#26362f]">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5d685f]">{section.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {practicalExamples.map((example) => (
                <article key={example.title} className="rounded-2xl border border-[#cfc5b6] bg-[#1e2a24] p-4 text-white">
                  <h3 className="text-lg font-bold text-[#d8f1e9]">{example.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#bfd0c9]">{example.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-[1.35rem] border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur-xl sm:p-7">
            <h2 className="font-display text-3xl font-semibold text-[#20251f]">Free Calorie Calculator FAQ</h2>
            <div className="mt-5 grid gap-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#d8d0c5] bg-white/60 p-4">
                  <h3 className="text-base font-bold text-[#26362f]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5d685f]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-[1.35rem] border border-[#d8d0c5] bg-white/55 p-4 shadow-sm backdrop-blur-xl sm:p-6">
            <h2 className="text-xl font-bold text-[#26362f]">Related fitness calculators</h2>
            <p className="mt-2 text-sm leading-6 text-[#5d685f]">
              These planned tools will support BMI, protein intake, calorie deficit, and macro planning as the calculator
              library grows.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {futureCalculatorRoutes.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  aria-label={`${tool.title} coming soon`}
                  className="rounded-full border border-[#d8d0c5] bg-white/50 px-4 py-2 text-sm font-bold text-[#59645c] transition hover:border-[#2f6f5f] hover:bg-white/80 hover:text-[#2f6f5f]"
                >
                  {tool.title}
                </a>
              ))}
            </div>
          </section>

          <footer className="flex flex-col items-center justify-between gap-3 py-6 text-sm font-semibold text-[#5d685f] sm:flex-row">
            <p>{DEFAULT_TITLE}</p>
            <nav aria-label="Footer links" className="flex gap-4">
              <a className="transition hover:text-[#2f6f5f]" href="/privacy">
                Privacy Policy
              </a>
              <a className="transition hover:text-[#2f6f5f]" href="/terms">
                Terms
              </a>
              <a className="transition hover:text-[#2f6f5f]" href="/contact">
                Contact
              </a>
            </nav>
          </footer>
        </div>
      </main>
    </>
  );
}
