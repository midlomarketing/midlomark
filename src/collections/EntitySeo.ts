import {CollectionConfig} from 'payload'
import {userPerms} from '@/utilities/permissions'

const EntitySeo: CollectionConfig = {
    slug: 'entitySeo',
    access: {
        read: () => true,
        create: (req) => userPerms(req),
        update: (req) => userPerms(req),
        delete: (req) => userPerms(req),
    },
    admin: {
        group: 'Admin',
        useAsTitle: 'title',
    },
    labels: {singular: 'Entity', plural: 'Entities'},
    fields: [
        {
            name: 'title',
            type: 'text',
            admin: {
                hidden: true,
            },
            unique: true,
            required: true,
            hooks: {
                beforeChange: [
                    async ({ data }) => {
                        return `${data?.type}: ${data?.name}`
                    }
                ]
            }
        },
        {
            name: 'type',
            type: 'text',
            admin: {
                description: 'See https://schema.org to see available types.',
            },
        },
        {
            name: 'name',
            type: 'text',
            admin: {
                description: 'Name of the entity.',
            },
        },
        {
            name: 'sameAs',
            labels: {plural: 'sameAs', singular: 'sameAs'},
            type: 'array',
            fields: [
                {
                    name: 'source',
                    type: 'text',
                    defaultValue: 'https://google.com/search?&kgmid=',
                    admin: {
                        description: 'You can also use a Wikipedia link here.'
                    }
                }
            ],
            admin: {
                description:
                    'This should be an external URL to tell Google more about this entity. See https://developers.google.com/knowledge-graph/reference/rest/v1 to lookup values',
            },
        },
    ],
}

export default EntitySeo
