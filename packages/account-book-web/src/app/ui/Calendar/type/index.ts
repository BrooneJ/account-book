import { z } from "zod";

const listSchema = z.array(
  z.object({
    id: z.number(),
    type: z.string(),
    amount: z.number(),
    date: z.string(),
    financialSource: z.string().optional(),
    category: z.string().optional(),
  }),
);

const calendarSchema = z.array(
  z.object({
    date: z.string(),
    list: listSchema,
  }),
);

export type ListData = z.infer<typeof listSchema>;
export type CalendarData = z.infer<typeof calendarSchema>;
