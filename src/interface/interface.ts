export interface Counter {
  key: string,
  name: string,
  textColor: string,
  backgroundColor: string,
  count: number,
}

export interface Group {
  key: string,
  groupName: string,
  detail: string,
  lastUpdate: string,
  counters: Counter[],
}
