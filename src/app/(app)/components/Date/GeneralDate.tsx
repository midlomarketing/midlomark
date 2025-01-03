import { GenericDate, GenericTime } from '@/app/(app)/utils/formatDate'

export function GeneralDate({
  date,
  className,
  endDate,
  includeTime = false,
}: {
  date: string | Date
  endDate?: string | Date
  className?: string
  includeTime: boolean
}) {
  if (
    endDate &&
    (new Date(endDate).getDay() !== new Date(date).getDay() ||
      new Date(endDate).getMonth() !== new Date(date).getMonth())
  ) {
    return (
      <p className={className}>
        <span>{`${GenericDate(date)} - ${GenericDate(endDate)}`}</span>
        {includeTime && <span>${` at ${GenericTime(date)} - ${GenericTime(endDate)}`}</span>}
      </p>
    )
  } else {
    return (
      <p className={className}>
        <span>{GenericDate(date)}</span>
        {includeTime && <span>{` at ${GenericTime(date)} - ${GenericTime(endDate || ``)}`}</span>}
      </p>
    )
  }
}
