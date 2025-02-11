import React from 'react'

import { Width } from '../Width'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {RichText} from "@/app/(app)/components/RichText";

export const Message: React.FC = ({ message }: { message: SerializedEditorState }) => {
  return (
    <Width className={`my-12`} width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
