export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
export const SITE_NAME = "Aaryan Tools";
export const DEFAULT_TITLE = "TDEE Calculator With Macros  Free Calorie Calculator";
export const DEFAULT_DESCRIPTION =
  "Use this free TDEE calculator to estimate your maintenance calories, cutting calories, bulking calories, BMI, and protein, carbs, and fat macros.";

export const FITNESS_KEYWORDS = [
  "TDEE calculator",
  "free TDEE calculator",
  "TDEE calculator with macros",
  "calorie calculator",
  "maintenance calorie calculator",
  "cutting calorie calculator",
  "bulking calorie calculator",
  "macro calculator",
  "protein intake calculator",
  "BMI calculator",
  "calorie deficit calculator",
  "protein carbs fat calculator",
];

export const creator = "Aaryan Kunjan";

export const socialProfiles = [
  "https://github.com/kannan12300",
  "https://x.com/your-handle",
  "https://www.producthunt.com/@your-handle",
] as const;

export const futureCalculatorRoutes = [
  {
    title: "BMI Calculator",
    href: "/bmi-calculator",
    description: "Estimate body mass index from height and weight.",
    priority: 0.45,
  },
  {
    title: "Protein Calculator",
    href: "/protein-calculator",
    description: "Estimate daily protein intake from bodyweight and goal.",
    priority: 0.45,
  },
  {
    title: "Calorie Deficit Calculator",
    href: "/calorie-deficit-calculator",
    description: "Plan calories to lose fat at a sustainable rate.",
    priority: 0.45,
  },
  {
    title: "Macro Calculator",
    href: "/macro-calculator",
    description: "Calculate protein, carbs, and fat targets from calories.",
    priority: 0.45,
  },
] as const;

export const faqItems = [
  {
    question: "What is the most accurate TDEE calculator formula?",
    answer:
      "This calculator uses the Mifflin-St Jeor formula, which is widely used for estimating BMR, then adjusts it by activity level to estimate TDEE.",
  },
  {
    question: "Is this TDEE calculator good for cutting?",
    answer:
      "Yes. Choose Fat loss to estimate calories to lose fat and calculate macros for cutting with higher protein to help preserve muscle.",
  },
  {
    question: "Can I use this calculator for bulking?",
    answer:
      "Yes. Choose Muscle gain to estimate calories to gain muscle and calculate macros for bulking with enough carbs to support training.",
  },
  {
    question: "How much protein should I eat per day?",
    answer:
      "Protein depends on your goal and bodyweight. This protein intake calculator uses 2.2g/kg for cutting, 1.8g/kg for maintenance, and 2.0g/kg for bulking.",
  },
  {
    question: "Is BMI included in this calculator?",
    answer:
      "Yes. The result panel includes BMI alongside BMR, TDEE, goal calories, and protein, carbs, and fat macros.",
  },
] as const;

export const seoSections = [
  {
    title: "What is TDEE?",
    body:
      "TDEE means total daily energy expenditure. It is an estimate of how many calories you burn in a full day, including basic body functions, movement, exercise, and daily activity.",
  },
  {
    title: "How does this TDEE calculator work?",
    body:
      "This free TDEE calculator uses your age, gender, height, weight, and activity level to estimate BMR with the Mifflin-St Jeor formula. It then applies an activity multiplier to calculate daily calories.",
  },
  {
    title: "How to use your calorie result",
    body:
      "Use the main calorie result as a starting point, not a fixed rule. Track your bodyweight and energy for two to three weeks, then adjust if your real-world progress does not match your goal.",
  },
  {
    title: "Cutting, maintenance, and bulking calories",
    body:
      "Use maintenance calories to hold weight steady, cutting calories to lose fat, and bulking calories to gain muscle. This maintenance calories calculator also works as a TDEE calculator for cutting or a TDEE calculator for bulking.",
  },
  {
    title: "Protein, carbs, and fat macros",
    body:
      "The macro calculator estimates protein, carbs, and fat from your goal calories and bodyweight. It can help answer how many calories should I eat, calories to lose fat, calories to gain muscle, and how to calculate macros for cutting or bulking.",
  },
] as const;

export const contextualLinks = [
  { href: "/", label: "TDEE", text: "daily calorie estimate" },
  { href: "/bmi-calculator", label: "BMI", text: "body mass context" },
  { href: "/macro-calculator", label: "macros", text: "protein, carbs, and fat targets" },
  { href: "/protein-calculator", label: "protein intake", text: "daily protein planning" },
  { href: "/calorie-deficit-calculator", label: "calorie deficit", text: "cutting calorie planning" },
] as const;

export const jsonLdIds = {
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
  webApplication: `${SITE_URL}/#tdee-calculator`,
  breadcrumb: `${SITE_URL}/#breadcrumb`,
  faq: `${SITE_URL}/#faq`,
};

// Future SEO scaling:
// Add new calculator routes to `futureCalculatorRoutes`, then create matching App Router pages.
// Reuse DEFAULT_TITLE, DEFAULT_DESCRIPTION, FITNESS_KEYWORDS, and SITE_NAME for page metadata.
// Keep sitemap entries synced with real routes once each future calculator page is published.
