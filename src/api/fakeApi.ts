function makeToday(time: string): number {
  const today = new Date();
  const month = today.toLocaleDateString("en", { month: "2-digit" });
  const date = today.toLocaleDateString("en", { day: "2-digit" });
  return +`${today.getFullYear()}${month}${date}${time}`;
}

export const LOADINGS = [
  {
    "loading_id": "0007701",
    "ramp_id": "002",
    "pallets": 2,
    "picked_hus": 2,
    "planned_start": makeToday("0600"),
    "planned_end": makeToday("0900"),
    "deliveries": [
      {
        "ship_to": "0000771996",
      }
    ],
  },
  {
    "loading_id": "0007702",
    "ramp_id": "003",
    "pallets": 1,
    "picked_hus": 1,
    "planned_start": makeToday("0700"),
    "planned_end": makeToday("1100"),
    "deliveries": [
      {
        "ship_to": "0000771915",
      }
    ],
  },
  {
    "loading_id": "0007703",
    "ramp_id": "003",
    "pallets": 22,
    "picked_hus": 11,
    "planned_start": makeToday("0800"),
    "planned_end": makeToday("1230"),
    "deliveries": [
      {
        "ship_to": "0000771990",
      }
    ],
  },
  {
    "loading_id": "0007704",
    "ramp_id": "004",
    "pallets": 36,
    "picked_hus": 14,
    "planned_start": makeToday("1100"),
    "planned_end": makeToday("1300"),
    "deliveries": [
      {
        "ship_to": "0000771998",
      }
    ],
  },
  {
    "loading_id": "0007705",
    "ramp_id": "004",
    "pallets": 6,
    "picked_hus": 3,
    "planned_start": makeToday("1230"),
    "planned_end": makeToday("1400"),
    "deliveries": [
      {
        "ship_to": "0000772021",
      }
    ],
  },
  {
    "loading_id": "0007706",
    "ramp_id": "004",
    "pallets": 7,
    "picked_hus": 5,
    "planned_start": makeToday("1300"),
    "planned_end": makeToday("1500"),
    "deliveries": [
      {
        "ship_to": "0000771991",
      }
    ],
  },
  {
    "loading_id": "0007707",
    "ramp_id": "005",
    "pallets": 42,
    "picked_hus": 0,
    "planned_start": makeToday("1400"),
    "planned_end": makeToday("1900"),
    "deliveries": [
      {
        "ship_to": "0000771996",
      }
    ],
  },
  {
    "loading_id": "0007708",
    "ramp_id": "005",
    "pallets": 29,
    "picked_hus": 3,
    "planned_start": makeToday("1500"),
    "planned_end": makeToday("1900"),
    "deliveries": [
      {
        "ship_to": "0000771915",
      }
    ],
  },
  {
    "loading_id": "0007709",
    "ramp_id": "",
    "pallets": 100,
    "picked_hus": 99,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771990",
      }
    ],
  },
  {
    "loading_id": "0007710",
    "ramp_id": "",
    "pallets": 1,
    "picked_hus": 0,
    "planned_start": makeToday("1700"),
    "planned_end": makeToday("2100"),
    "deliveries": [
      {
        "ship_to": "0000772020",
      }
    ],
  },
  {
    "loading_id": "0007711",
    "ramp_id": "",
    "pallets": 39,
    "picked_hus": 14,
    "planned_start": makeToday("1900"),
    "planned_end": makeToday("2230"),
    "deliveries": [
      {
        "ship_to": "0000771998",
      }
    ],
  },
];
