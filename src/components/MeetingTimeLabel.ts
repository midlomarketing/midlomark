'use client'
import { useRowLabel } from '@payloadcms/ui'

export const MeetingTimeLabel = () => {
  const { data, rowNumber } = useRowLabel()
  // @ts-ignore
  return data?.time || `Time ${String(index).padStart(2, '0')}`
}
