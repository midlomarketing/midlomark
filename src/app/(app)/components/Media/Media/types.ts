import {CreditType} from "@/app/(app)/utils/types";

export interface ImageObject {
    image: {
        filename: string,
        altDescription: string,
        width: number | `${number}`
        height: number | `${number}`
        credit?: CreditType
    }
    id?: string
    style?: {
        objectPosition?: string
    },
}

export interface LogoObjectType {
    filename?: string,
    altDescription?: string,
    width?: number | `${number}`,
    height?: number | `${number}`,
    credit?: CreditType,
    id?: string,
}

export interface VideoType {
    video: string
    videoName: string,
    displayVideoName?: boolean,
    description_html: string
    image: ImageObject
    uploadDate: Date | string
    minutes: number | `${number}` | string
    seconds: number | `${number}` | string
    creatorName?: string
}