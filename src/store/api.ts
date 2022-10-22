import { Customer } from "./Customer";
import { CUSTOMERS, LOADINGS, RAMPS } from "./fakeApi";
import { Loading } from "./Loading";
import { Ramp } from "./Ramp";

export class API {
  getCustomers(): Customer[] {
    return CUSTOMERS.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1));
  }
  
  getRamps(): Ramp[] {
    return RAMPS.map(r => new Ramp(r.ramp_id, r.description));
  }

  getLoadings(): Loading[] {
    return LOADINGS.map(l => new Loading(
      l.loading_id,
      l.ramp_id,
      l.pallets,
      l.picked_hus,
      l.planned_start,
      l.planned_end,
      l.deliveries,
    ));
  }
}

export const api = new API();
