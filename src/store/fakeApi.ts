export const CUSTOMERS = [
  {
    "kunnr": "0000771996",
    "name1": "Militech",
    "ort01": "Washington, D.C.",
    "land1": "US"
  },
  {
    "kunnr": "0000771915",
    "name1": "Arasaka",
    "ort01": "Tokyo",
    "land1": "JP"
  },
  {
    "kunnr": "0000771990",
    "name1": "Kang Tao",
    "ort01": "Shenyang",
    "land1": "CN"
  },
  {
    "kunnr": "0000772020",
    "name1": "Biotechnica",
    "ort01": "Rome",
    "land1": "IT"
  },
  {
    "kunnr": "0000771998",
    "name1": "SovOil",
    "ort01": "Moscow",
    "land1": "RU"
  },
  {
    "kunnr": "0000772021",
    "name1": "Trauma Team",
    "ort01": "Seattle",
    "land1": "US"
  },
  {
    "kunnr": "0000771991",
    "name1": "Mitsubishi-Sugo",
    "ort01": "Nagano",
    "land1": "JP"
  }
];

export const RAMPS = [
  {
    "ramp_id": "001",
    "description": "A",
  },
  {
    "ramp_id": "002",
    "description": "B",
  },
  {
    "ramp_id": "003",
    "description": "C",
  },
  {
    "ramp_id": "004",
    "description": "D",
  },
  {
    "ramp_id": "005",
    "description": "E",
  },
  {
    "ramp_id": "006",
    "description": "F",
  },
  {
    "ramp_id": "007",
    "description": "G",
  },
];

function makeToday(time: string): number {
  const today = new Date();
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth()+1}` : `${today.getMonth()+1}`;
  const date = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
  return +`${today.getFullYear()}${month}${date}${time}`;
}

export const LOADINGS = [
  {
    "loading_id": "0007701",
    "ramp_id": "002",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771996",
      }
    ],
  },
  {
    "loading_id": "0007702",
    "ramp_id": "003",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771915",
      }
    ],
  },
  {
    "loading_id": "0007703",
    "ramp_id": "003",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771990",
      }
    ],
  },
  {
    "loading_id": "0007704",
    "ramp_id": "004",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771998",
      }
    ],
  },
  {
    "loading_id": "0007705",
    "ramp_id": "004",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000772021",
      }
    ],
  },
  {
    "loading_id": "0007706",
    "ramp_id": "004",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771991",
      }
    ],
  },
  {
    "loading_id": "0007707",
    "ramp_id": "005",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771996",
      }
    ],
  },
  {
    "loading_id": "0007708",
    "ramp_id": "005",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771915",
      }
    ],
  },
  {
    "loading_id": "0007709",
    "ramp_id": "007",
    "pallets": 2,
    "picked_hus": 0,
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
    "ramp_id": "007",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000772020",
      }
    ],
  },
  {
    "loading_id": "0007711",
    "ramp_id": "007",
    "pallets": 2,
    "picked_hus": 0,
    "planned_start": makeToday("1600"),
    "planned_end": makeToday("2000"),
    "deliveries": [
      {
        "ship_to": "0000771998",
      }
    ],
  },
];
