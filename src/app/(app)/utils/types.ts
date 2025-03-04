
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
