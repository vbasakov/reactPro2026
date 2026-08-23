export interface ClickTimerData {
  count: number
  firstClick: Date | null
  lastClick: Date | null
}

export interface DebounceResult {
  isLoading: boolean
  data: Array<{ id: number; title: string }>
  error: string | null
}
