'use client'
import {useRowLabel} from '@payloadcms/ui'

export const CardSectionLabels = () => {
  const { data, rowNumber } = useRowLabel()
  // @ts-ignore
  return data?.cardHeader || `Card ${String(rowNumber).padStart(2, '0')}`
}
