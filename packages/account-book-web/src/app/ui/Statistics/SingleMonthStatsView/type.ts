export type StatisticsResponseListType = StatisticsResponseSingleType[];

export type StatisticsResponseSingleType = {
  id: string;
  label: string;
  value: number;
  count: number;
};
