export type Filter = 'all' | 'completed' | 'incomplete'

export type FilterButtonProps = {
  currentFilter: Filter
  targetFilter: Filter
  handler: (filter: Filter) => void
}
