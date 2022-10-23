import { DateTime } from "../store/Loading";
import { Ramp } from "../store/Ramp";
import { store } from "../store/Store";

export class FromResponse {
  static dateTime(dataTime: number): DateTime {
    const [, year, month, date, hours, minutes] = dataTime.toString()
      .match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/) || [];
    return new DateTime(new Date(+year, (+month)-1, +date, +hours, +minutes)); 
  }

  static ramp(ramp_id: string): Ramp | undefined {
    if (!ramp_id) {
      return undefined;
    }
  
    return store.ramps.find(ramp => ramp.id === ramp_id) || new Ramp(ramp_id, `(${ramp_id})`);
  }
}

export class ForRequest {
  static  dateTime(dateTime: DateTime): number {
    const year = dateTime.dateTime.getFullYear();
    const month = dateTime.dateTime.toLocaleDateString("en", { month: "2-digit" });
    const day = dateTime.dateTime.toLocaleDateString("en", { day: "2-digit" });
    const hour = dateTime.dateTime.toLocaleTimeString("en", { hour: "2-digit", hour12: false });
    const minutes = dateTime.dateTime.toLocaleTimeString("en", {  minute: "2-digit" });
    return +`${year}${month}${day}${hour}${minutes}`;
  }
}
