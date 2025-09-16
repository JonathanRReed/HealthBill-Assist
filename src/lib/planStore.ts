export type PlanItem =
  | {
      id: string;
      type: "cash";
      amount: number;
      fee: number;
      total: number;
      scheduleDate: string; // human-readable (e.g., "Next Friday")
      createdAt: number;
    }
  | {
      id: string;
      type: "bill";
      name: string;
      amount: number;
      schedule: { date: string; amount: number; description: string }[]; // ISO date strings
      createdAt: number;
    };

const KEY = "fairflow_plan_v1";

function emitUpdated() {
  try {
    window.dispatchEvent(new CustomEvent("plan:updated"));
  } catch {
    // noop in SSR/non-browser environments
  }
}

export function getPlan(): PlanItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlanItem[]) : [];
  } catch {
    return [];
  }
}

export function savePlan(items: PlanItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  emitUpdated();
}

export function addItem(item: PlanItem) {
  const items = getPlan();
  items.push(item);
  savePlan(items);
}

export function clearPlan() {
  savePlan([]);
}

export function removeItem(id: string) {
  const items = getPlan().filter((i) => i.id !== id);
  savePlan(items);
}
