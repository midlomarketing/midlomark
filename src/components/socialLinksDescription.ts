'use client'
import { useRowLabel } from '@payloadcms/ui'

export const SocialLinksDescription = () => {
  const { data, rowNumber } = useRowLabel()
  // @ts-ignore
  return data?.channel || `Social Media Link ${String(rowNumber).padStart(2, '0')}`
}
