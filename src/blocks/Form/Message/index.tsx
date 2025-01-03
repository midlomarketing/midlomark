import {SerializeLexical} from "@/app/(app)/components/RichText/Lexical";
import React from 'react'

import { Width } from '../Width'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Message: React.FC = ({ message }: { message: SerializedEditorState }) => {
  return (
    <Width className={`my-12`} width="100">
      {message && <SerializeLexical nodes={message?.root.children} />}
    </Width>
  )
}
