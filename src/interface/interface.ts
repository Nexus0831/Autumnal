export interface counter {
  key: string,
  name: string,
  textColor: string,
  backgroundColor: string,
  count: number,
}

export interface group {
  key: string,
  groupName: string,
  detail: string,
  lastUpdate: string,
  counters: counter[],
}
