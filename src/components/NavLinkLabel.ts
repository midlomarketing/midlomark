'use client'
import { useRowLabel } from '@payloadcms/ui'

export const NavLinkLabel = () => {
  const { data, rowNumber } = useRowLabel()
  // @ts-ignore
  return data?.name || `Link ${String(rowNumber).padStart(2, '0')}`
}
