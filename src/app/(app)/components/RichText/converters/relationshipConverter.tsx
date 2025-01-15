import { SerializedRelationshipNode } from "@payloadcms/richtext-lexical";
import type {User} from '@/payload-types'
import {JSXConverters} from "@payloadcms/richtext-lexical/react";

export const relationshipConverter: JSXConverters<SerializedRelationshipNode> = {
  relationship: ({node}) => {
    if (node.relationTo === 'users') {
      const user = node.value as User
      return <div>
        <h3 style={{ 'color': 'white'}}>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    }
  }
}
