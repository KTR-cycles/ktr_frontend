/** Values must match API `age_group` field (normalize in api.ts if backend differs). */
export const AGE_GROUP_OPTIONS = [
  { value: "3-8", label: "3–8 yrs", homeLabel: "Age 3–8 yrs" },
  { value: "9-12", label: "9–12 yrs", homeLabel: "Age 9–12 yrs" },
  { value: "13-15", label: "13–15 yrs", homeLabel: "Age 13–15 yrs" },
  { value: "15+", label: "15+ yrs", homeLabel: "Age 15+ yrs" },
] as const;

export type AgeGroupValue = (typeof AGE_GROUP_OPTIONS)[number]["value"];

export const AGE_GROUP_VALUES = new Set<string>(
  AGE_GROUP_OPTIONS.map((o) => o.value),
);

export function isValidAgeGroup(value: string): boolean {
  return AGE_GROUP_VALUES.has(value);
}

export function filterOptionsForFilters() {
  return AGE_GROUP_OPTIONS.map((o) => ({ id: o.value, name: o.label }));
}
