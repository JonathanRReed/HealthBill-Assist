export interface Profile {
  id: string;
  name: string;
  age: number;
  description: string;
  deposits: number[];
  nsfCount: number;
  expectedLimit: number;
}

export const profiles: Profile[] = [
  {
    id: "alex",
    name: "Alex",
    age: 26,
    description: "Hourly worker - steady income",
    deposits: [985, 990, 978],
    nsfCount: 0,
    expectedLimit: 240,
  },
  {
    id: "riley",
    name: "Riley",
    age: 20,
    description: "Student - irregular income",
    deposits: [450, 0, 320],
    nsfCount: 1,
    expectedLimit: 90,
  },
  {
    id: "sam",
    name: "Sam",
    age: 41,
    description: "Caregiver - multiple bills",
    deposits: [1200, 1150, 1180],
    nsfCount: 0,
    expectedLimit: 280,
  },
];
