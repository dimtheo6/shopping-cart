import { startOfWeek, endOfWeek, format, subDays } from "date-fns";

// Filters for new releases
export const buildWeekFilter = () => {
    const startOfCurrentWeek = format(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    );
    const endOfCurrentWeek = format(
      endOfWeek(new Date(), { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    );
  
    return `&dates=${startOfCurrentWeek},${endOfCurrentWeek}`;
  };
  
  export const buildDateFilter = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const in7Days = format(
      new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    );
  
    return `&dates=${today},${in7Days}`;
  };
  
  export const buildLast30DaysFilter = () => {
    const startDate = format(subDays(new Date(), 30), "yyyy-MM-dd");
    const endDate = format(new Date(), "yyyy-MM-dd");
  
    return `&dates=${startDate},${endDate}`;
  };