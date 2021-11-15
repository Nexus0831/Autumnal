export interface Counter {
  key: string,
  name: string,
  textColor: string,
  backgroundColor: string,
  count: number,
  isGraphic: boolean,
}

export interface Percentage {
  color: string,
  percent: string,
}

export interface Group {
  key: string,
  groupName: string,
  detail: string,
  lastUpdate: string,
  counters: Counter[],
}

export interface CountRecord {
  key: string,
  Date: string,
  counterKey: string,
  count: number,
}
