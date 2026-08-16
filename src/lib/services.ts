/**
 * Service catalogue, grouped so the page reads as three considered categories
 * instead of fifteen identical cards. Every item is from the client brief.
 */

export type ServiceGroup = {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "maintenance",
    index: "01",
    title: "Maintenance",
    summary:
      "The routine work that keeps a vehicle out of the repair bay — done on schedule and done properly.",
    items: [
      "Preventive Maintenance",
      "Oil, Lube & Filter Service",
      "Battery Service",
      "Tire Repair & Replacement",
      "Vehicle Inspection",
    ],
  },
  {
    id: "repair",
    index: "02",
    title: "Diagnostics & Repair",
    summary:
      "Drivability problems, warning lights and wear items — identified first, then repaired.",
    items: [
      "Diagnostics",
      "General Auto Repair",
      "Brake Repair",
      "Electrical & Wiring",
      "A/C & Heating",
      "Exhaust System Work",
    ],
  },
  {
    id: "specialized",
    index: "03",
    title: "Specialized",
    summary:
      "Heavier and less common work that most shops send elsewhere. Rasmussen keeps it in house.",
    items: [
      "Diesel Repair",
      "Fleet Service",
      "Differential & 4WD Service",
      "Smog / Emissions",
      "Heavy Equipment",
    ],
  },
];

/** Flat list, used for the AutoRepair structured data. */
export const allServices = serviceGroups.flatMap((group) => group.items);
