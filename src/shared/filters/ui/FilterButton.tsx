import styles from './FilterButton.module.css'

import type { FilterButtonProps } from '../model/types'

export function FilterButton({
  currentFilter,
  targetFilter,
  handler: onClick,
}: FilterButtonProps) {
  return (
    <button
      className={currentFilter === targetFilter ? styles.filterSelected : ''}
      onClick={() => onClick(targetFilter)}
    >
      {targetFilter}
    </button>
  )
}
