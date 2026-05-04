"use client";

import { useId, useMemo, useState } from "react";

type Gender = "male" | "female";
type HeightUnit = "cm" | "in" | "ft";
type WeightUnit = "kg" | "lb";
type Activity = "sedentary" | "light" | "moderate" | "very" | "athlete";
type Goal = "maintain" | "loss" | "gain";
type MacroKey = "protein" | "carbs" | "fat";
type NumericInput = number | "";

const activityOptions: Array<{ value: Activity; label: string; multiplier: number }> = [
  { value: "sedentary", label: "Sedentary", multiplier: 1.2 },
  { value: "light", label: "Lightly active", multiplier: 1.375 },
  { value: "moderate", label: "Moderately active", multiplier: 1.55 },
  { value: "very", label: "Very active", multiplier: 1.725 },
  { value: "athlete", label: "Athlete", multiplier: 1.9 },
];

const goalOptions: Array<{ value: Goal; label: string; adjustment: number }> = [
  { value: "maintain", label: "Maintain", adjustment: 0 },
  { value: "loss", label: "Fat loss", adjustment: -500 },
  { value: "gain", label: "Muscle gain", adjustment: 300 },
];

const macroRules: Record<Goal, { proteinPerKg: number; fatPerKg: number }> = {
  loss: { proteinPerKg: 2.2, fatPerKg: 0.8 },
  maintain: { proteinPerKg: 1.8, fatPerKg: 0.9 },
  gain: { proteinPerKg: 2, fatPerKg: 1 },
};

const macroStyles: Record<MacroKey, { label: string; color: string; bg: string; border: string }> = {
  protein: {
    label: "Protein",
    color: "#80d7c2",
    bg: "bg-[#244238]",
    border: "border-[#80d7c2]/30",
  },
  carbs: {
    label: "Carbs",
    color: "#f0c56f",
    bg: "bg-[#443b25]",
    border: "border-[#f0c56f]/30",
  },
  fat: {
    label: "Fat",
    color: "#e69778",
    bg: "bg-[#4a332d]",
    border: "border-[#e69778]/30",
  },
};

const formatNumber = (value: number) => Math.round(value).toLocaleString("en-US");
const clampPositive = (value: NumericInput, fallback: number) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : fallback;
};
const heightToCm = (height: number, unit: HeightUnit) => {
  if (unit === "in") return height * 2.54;
  if (unit === "ft") return height * 30.48;
  return height;
};
const heightFromCm = (heightCm: number, unit: HeightUnit) => {
  if (unit === "in") return heightCm / 2.54;
  if (unit === "ft") return heightCm / 30.48;
  return heightCm;
};
const weightToKg = (weight: number, unit: WeightUnit) => (unit === "lb" ? weight * 0.45359237 : weight);
const weightFromKg = (weightKg: number, unit: WeightUnit) => (unit === "lb" ? weightKg / 0.45359237 : weightKg);
const displayMeasurement = (value: number, unit: HeightUnit | WeightUnit) =>
  unit === "ft" ? Number(value.toFixed(2)) : Math.round(value);

export default function Home() {
  const activityId = useId();
  const [gender, setGender] = useState<Gender>("male");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [age, setAge] = useState<NumericInput>(28);
  const [height, setHeight] = useState<NumericInput>(175);
  const [weight, setWeight] = useState<NumericInput>(75);

  const results = useMemo(() => {
    const safeAge = clampPositive(age, 28);
    const safeHeight = clampPositive(height, heightUnit === "cm" ? 175 : heightUnit === "in" ? 69 : 5.75);
    const safeWeight = clampPositive(weight, weightUnit === "kg" ? 75 : 165);
    const weightKg = weightToKg(safeWeight, weightUnit);
    const heightCm = heightToCm(safeHeight, heightUnit);
    const heightM = heightCm / 100;
    const activityMultiplier = activityOptions.find((item) => item.value === activity)?.multiplier ?? 1.55;
    const goalAdjustment = goalOptions.find((item) => item.value === goal)?.adjustment ?? 0;
    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * safeAge + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * safeAge - 161;
    const tdee = bmr * activityMultiplier;
    const goalCalories = Math.max(tdee + goalAdjustment, 1000);
    const bmi = weightKg / (heightM * heightM);
    const rule = macroRules[goal];
    const protein = weightKg * rule.proteinPerKg;
    const fat = weightKg * rule.fatPerKg;
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const remainingCalories = Math.max(goalCalories - proteinCalories - fatCalories, 0);
    const carbs = remainingCalories / 4;
    const carbCalories = carbs * 4;
    const macroCalories = proteinCalories + carbCalories + fatCalories;
    const macroPercents = {
      protein: macroCalories > 0 ? (proteinCalories / macroCalories) * 100 : 0,
      carbs: macroCalories > 0 ? (carbCalories / macroCalories) * 100 : 0,
      fat: macroCalories > 0 ? (fatCalories / macroCalories) * 100 : 0,
    };

    return { bmr, tdee, goalCalories, bmi, protein, fat, carbs, macroPercents };
  }, [activity, age, gender, goal, height, heightUnit, weight, weightUnit]);

  const heightLabel = `Height (${heightUnit})`;
  const weightLabel = `Weight (${weightUnit})`;

  return (
    <section
      aria-labelledby="calculator-title"
      className="flex min-h-screen items-start justify-center sm:items-center"
    >
      <div className="w-full">
        <div className="rounded-[1.35rem] border border-white/70 bg-[var(--card)] p-3 shadow-premium backdrop-blur-2xl sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="mb-4 flex flex-col gap-2 border-b border-[var(--line)] pb-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2f6f5f]">Aaryan Tools</p>
              <h1 id="calculator-title" className="mt-1 font-display text-[2.35rem] font-semibold leading-none text-[#20251f] sm:mt-2 sm:text-5xl">
                TDEE Calculator With Macros
              </h1>
              <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">Find your daily calories in seconds</p>
            </div>
            <div className="w-fit rounded-full border border-[#d7cdbf] bg-white/65 px-3 py-1.5 text-xs font-semibold text-[#45515b] sm:px-4 sm:py-2 sm:text-sm">
              Browser only
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-4 sm:space-y-5">
              <Segmented
                label="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                value={gender}
                onChange={setGender}
              />

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <NumberField label="Age" value={age} onChange={setAge} min={13} max={100} />
                <NumberField
                  label={heightLabel}
                  value={height}
                  onChange={setHeight}
                  min={1}
                  step={heightUnit === "ft" ? 0.01 : 1}
                />
                <NumberField label={weightLabel} value={weight} onChange={setWeight} min={1} />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Segmented
                  label="Height unit"
                  options={[
                    { value: "cm", label: "cm" },
                    { value: "in", label: "inch" },
                    { value: "ft", label: "ft" },
                  ]}
                  value={heightUnit}
                  onChange={(nextUnit) => {
                    if (nextUnit !== heightUnit) {
                      const heightCm = heightToCm(clampPositive(height, 175), heightUnit);
                      setHeight(displayMeasurement(heightFromCm(heightCm, nextUnit), nextUnit));
                      setHeightUnit(nextUnit);
                    }
                  }}
                />

                <Segmented
                  label="Weight unit"
                  options={[
                    { value: "kg", label: "kg" },
                    { value: "lb", label: "pound" },
                  ]}
                  value={weightUnit}
                  onChange={(nextUnit) => {
                    if (nextUnit !== weightUnit) {
                      const weightKg = weightToKg(clampPositive(weight, 75), weightUnit);
                      setWeight(displayMeasurement(weightFromKg(weightKg, nextUnit), nextUnit));
                      setWeightUnit(nextUnit);
                    }
                  }}
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#34423a]" id={`${activityId}-label`}>
                  Activity level
                </span>
                <select
                  id={activityId}
                  aria-labelledby={`${activityId}-label`}
                  value={activity}
                  onChange={(event) => setActivity(event.target.value as Activity)}
                  className="h-12 w-full rounded-2xl border border-[#d7cdbf] bg-white/80 px-4 text-sm font-semibold text-[#263238] outline-none transition focus:border-[#2f6f5f] focus:ring-4 focus:ring-[#2f6f5f]/15"
                >
                  {activityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <Segmented
                label="Goal"
                options={goalOptions.map(({ value, label }) => ({ value, label }))}
                value={goal}
                onChange={setGoal}
              />
            </div>

            <div className="rounded-[1.25rem] bg-[#1e2a24] p-3 text-white shadow-result sm:rounded-[1.5rem] sm:p-5">
              <div className="rounded-[1rem] border border-white/10 bg-white/[0.06] p-4 sm:rounded-[1.25rem] sm:p-5">
                <p className="text-sm font-semibold text-[#b9d8cc]">Goal calories</p>
                <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="font-display text-[clamp(2.55rem,13vw,4rem)] font-semibold leading-none sm:text-6xl">
                    {formatNumber(results.goalCalories)}
                  </span>
                  <span className="mb-2 text-sm font-semibold text-white/60">kcal/day</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3" aria-live="polite">
                <ResultCard label="TDEE" value={formatNumber(results.tdee)} unit="kcal" />
                <ResultCard label="BMR" value={formatNumber(results.bmr)} unit="kcal" />
                <ResultCard label="BMI" value={results.bmi.toFixed(1)} unit="score" />
                <MacroCard macro="protein" value={formatNumber(results.protein)} />
                <MacroCard macro="fat" value={formatNumber(results.fat)} />
                <MacroCard macro="carbs" value={formatNumber(results.carbs)} />
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition-all duration-300 sm:mt-4 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Macro split</p>
                  <p className="text-xs font-semibold text-[#b7c9c2]">{goalOptions.find((item) => item.value === goal)?.label}</p>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-black/20">
                  {(["protein", "carbs", "fat"] as MacroKey[]).map((macro) => (
                    <div
                      key={macro}
                      className="transition-all duration-500 ease-out"
                      style={{
                        width: `${results.macroPercents[macro]}%`,
                        backgroundColor: macroStyles[macro].color,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["protein", "carbs", "fat"] as MacroKey[]).map((macro) => (
                    <div key={macro} className="min-w-0">
                      <div className="mb-1 flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: macroStyles[macro].color }}
                        />
                        <span className="truncate text-[0.65rem] font-bold text-white/55 sm:text-xs">
                          {macroStyles[macro].label}
                        </span>
                      </div>
                      <p className="text-sm font-black text-white">{Math.round(results.macroPercents[macro])}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-xs font-semibold leading-relaxed text-[#bfd0c9] sm:grid-cols-2">
                <p className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  Higher protein helps preserve muscle during fat loss.
                </p>
                <p className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  Higher carbs support workout performance.
                </p>
              </div>
            </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: NumericInput;
  onChange: (value: NumericInput) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const inputId = useId();

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-bold text-[#34423a] sm:mb-2 sm:text-sm">
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue === "" ? "" : Number(nextValue));
        }}
        className="h-11 w-full min-w-0 rounded-2xl border border-[#d7cdbf] bg-white/80 px-3 text-base font-bold text-[#263238] outline-none transition focus:border-[#2f6f5f] focus:ring-4 focus:ring-[#2f6f5f]/15 sm:h-12 sm:px-4"
      />
    </div>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  const groupId = useId();

  return (
    <div role="group" aria-labelledby={groupId}>
      <span id={groupId} className="mb-1.5 block text-xs font-bold text-[#34423a] sm:mb-2 sm:text-sm">
        {label}
      </span>
      <div className="grid auto-cols-fr grid-flow-col gap-1.5 rounded-2xl border border-[#d7cdbf] bg-white/55 p-1.5 sm:gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`min-h-10 min-w-0 rounded-xl px-2 text-xs font-bold transition sm:px-3 sm:text-sm ${
                active
                  ? "bg-[#2f6f5f] text-white shadow-lg shadow-[#2f6f5f]/20"
                  : "text-[#53605a] hover:bg-white/80 hover:text-[#25342d]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="min-h-20 rounded-2xl border border-white/10 bg-white/[0.075] p-3 transition hover:bg-white/[0.11] sm:min-h-24 sm:p-4">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/50 sm:text-xs sm:tracking-[0.18em]">
        {label}
      </p>
      <p className="mt-2 text-[1.35rem] font-black leading-tight text-white sm:mt-3 sm:text-2xl">{value}</p>
      <p className="text-xs font-semibold text-[#a6bcb4]">{unit}</p>
    </div>
  );
}

function MacroCard({ macro, value }: { macro: MacroKey; value: string }) {
  const style = macroStyles[macro];

  return (
    <div
      className={`min-h-20 rounded-2xl border ${style.border} ${style.bg} p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-opacity-95 sm:min-h-24 sm:p-4`}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55 sm:text-xs sm:tracking-[0.18em]">
        {style.label}
      </p>
      <p className="mt-2 text-[1.35rem] font-black leading-tight text-white sm:mt-3 sm:text-2xl">{value}</p>
      <p className="text-xs font-semibold text-[#c2d2cc]">g/day</p>
    </div>
  );
}
