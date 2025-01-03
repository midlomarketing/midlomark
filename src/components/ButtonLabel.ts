'use client'
import { useRowLabel } from '@payloadcms/ui'

export const ButtonLabel = () => {
  const { data, rowNumber } = useRowLabel()
  // @ts-ignore
  return data?.title || `Button ${String(rowNumber).padStart(2, '0')}`
}
