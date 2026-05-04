export const SITE_URL = "https://example.com";

export const SEO_TITLE = "TDEE Calculator With Macros  Free Calorie Calculator";

export const SEO_DESCRIPTION =
  "Use this free TDEE calculator to estimate your maintenance calories, cutting calories, bulking calories, BMI, and protein, carbs, and fat macros.";

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

export const futureTools = ["BMI Calculator", "Protein Calculator", "Calorie Deficit Calculator", "Macro Calculator"] as const;
