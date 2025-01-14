import {JSXConvertersFunction, LinkJSXConverter} from "@payloadcms/richtext-lexical/react";
import {DefaultNodeTypes} from "@payloadcms/richtext-lexical";
import {internalDocToHref} from "./internalLink";
import {textConverter} from "@/app/(app)/components/RichText/converters/textConverter";

type NodeTypes = DefaultNodeTypes

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({internalDocToHref}),
  ...textConverter,
})
