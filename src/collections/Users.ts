import {CollectionConfig, getPayload} from 'payload'
import {adminPerms, fieldAdmin, userPerms, viewerPerms} from '@/utilities/permissions'
import configPromise from "@payload-config";
import slug from "@/components/slug";
import socialLinks from "@/components/socialLinks";

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
    defaultColumns: ['name', 'role', 'email', 'id'],
  },
  defaultSort: '-postCount',
  access: {
    read: (req) => viewerPerms(req),
    create: (req) => userPerms(req),
    update: (req) => adminPerms(req),
    delete: (req) => fieldAdmin(req),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slug('name'),
    socialLinks(),
    {
      access: {
        update: ({req: {user}}) => {
          if (user?.role === 'admin') {
            return true
          } else {
            return false
          }
        },
      },
      name: 'role',
      type: 'select',
      hasMany: false,
      required: true,
      options: [
        {label: 'Admin', value: 'admin'},
        {label: 'User', value: 'user'},
        {label: 'Viewer', value: 'viewer'},
        {label: 'Author', value: 'author'},
      ],
    },
    // Email added by default
    {
      name: 'isAuthor',
      type: 'checkbox',
    },
    {
      name: 'postsByUser',
      type: 'join',
      on: 'content.authors',
      collection: 'posts'
    },
    {
      name: 'postCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          async ({siblingData}) => {
            if (siblingData?.postsByUser?.docs) {
              return siblingData.postsByUser.docs.length
            }
          }
        ],
      },
    },
  ],
}

export {Users}
