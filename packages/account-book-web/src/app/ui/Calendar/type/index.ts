import { z } from "zod";

const calendarSchema = z.array(
  z.object({
    date: z.string(),
    list: z.array(
      z.object({
        id: z.number(),
        type: z.string(),
        amount: z.number(),
        date: z.string(),
        financialSource: z.string().optional(),
        category: z.string().optional(),
      }),
    ),
  }),
);

export type CalendarData = z.infer<typeof calendarSchema>;
