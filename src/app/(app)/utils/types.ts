import {SerializedLexicalNode} from "lexical";

export type Buttons = {
    buttons: {
        id: string
        link: string
        openInNewTab: string
        isPrimary: boolean
        title: string
        churchCenterLink: boolean
    }[]
}

export interface CreditType {
    creatorType?: string | null
    creator?: string | null
    creatorLink?: string | null
}

export type YesOrNo = 'Yes' | 'No'

export type AButton = {
    id?: string
    link?: string
    openInNewTab?: boolean
    isPrimary?: boolean
    title?: string
    label?: string
    className?: string
}

export type MetaImage = {
    url: string
    width: number | `${number}`
    height: number | `${number}`
}

export type SeriesProp = {
    params: {
        slug: string
    }
}

export type MetadataProps = {
    params: {
        slug: string
    }
}

export type ContentType = 'Message' | 'Series' | 'Song' | 'Album' | 'Event' | 'Small Group'

export interface LinkType {
    destination: string
    openInNewTab?: boolean
    title?: string
    cta: string
}

export interface RichTextType {
    root: {
        children: SerializedLexicalNode[]
    }
}
