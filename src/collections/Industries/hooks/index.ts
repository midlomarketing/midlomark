import {FieldHook} from "payload";

export const createCanonical: FieldHook = async ({data}) => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/industries/${data?.slug}`
}
