import type {
  SerializedHeadingNode,
  SerializedQuoteNode,
  SerializedTextNode,
  SerializedListItemNode,
  SerializedListNode
} from '@payloadcms/richtext-lexical'
import type {SerializedElementNode, SerializedLexicalNode} from '@payloadcms/richtext-lexical/lexical'
import classes from './index.module.scss'
import {RichTextUpload} from '../Upload'
import {icons} from '../../../utils/icons'
import {RenderBlocks} from '../../RenderBlocks'

import escapeHTML from 'escape-html'
import React, {Fragment, JSX} from 'react'

import {
    IS_BOLD,
    IS_CODE,
    IS_ITALIC,
    IS_STRIKETHROUGH,
    IS_SUBSCRIPT,
    IS_SUPERSCRIPT,
    IS_UNDERLINE,
    IS_HIGHLIGHT
} from './nodeFormat'
import Link from 'next/link'

interface Props {
    nodes?: SerializedLexicalNode[],
    className?: string
}

export function SerializeLexical({nodes, className}: Props): JSX.Element {
    return (
        <span className={`${className}`}>
      {nodes?.map((_node, index): JSX.Element | null => {
          if (_node.type === 'text') {
              const node = _node as SerializedTextNode
              let text = (
                  <span dangerouslySetInnerHTML={{__html: escapeHTML(node.text)}} key={index}/>
              )
              if (node.format & IS_BOLD) {
                  text = <strong key={index}>{text}</strong>
              }
              if (node.format & IS_HIGHLIGHT) {
                  text = <span key={index} className={classes.accent}>{text}</span>
              }
              if (node.format & IS_ITALIC) {
                  text = <em key={index}>{text}</em>
              }
              if (node.format & IS_STRIKETHROUGH) {
                  text = (
                      <span className="line-through" key={index}>
                {text}
              </span>
                  )
              }
              if (node.format & IS_UNDERLINE) {
                  text = <u key={index}>{text}</u>
              }
              if (node.format & IS_CODE) {
                  text = <code key={index}>{text}</code>
              }
              if (node.format & IS_SUBSCRIPT) {
                  text = <sub key={index}>{text}</sub>
              }
              if (node.format & IS_SUPERSCRIPT) {
                  text = <sup key={index}>{text}</sup>
              }

              return text
          }

          if (_node == null) {
              return null
          }

          // NOTE: Hacky fix for
          // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
          // which does not return checked: false (only true - i.e. there is no prop for false)
          const serializedChildrenFn = (node: SerializedElementNode): JSX.Element | null => {
              if (node.children == null) {
                  return null
              } else {
                  if (node?.type === 'list' && (node as SerializedListNode)?.listType === 'check') {
                      for (const item of node.children) {
                          if ('checked' in item) {
                              if (!item?.checked) {
                                  item.checked = false
                              }
                          }
                      }
                      return SerializeLexical({nodes: node.children})
                  } else {
                      return SerializeLexical({nodes: node.children})
                  }
              }
          }

          const serializedChildren =
              'children' in _node ? serializedChildrenFn(_node as SerializedElementNode) : ''

          switch (_node.type) {
              case 'linebreak': {
                  return <br key={index}/>
              }
              case 'paragraph': {
                  return <p key={index}>{serializedChildren}</p>
              }
              case 'heading': {
                  const node = _node as SerializedHeadingNode
                  type Heading = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
                  const Tag = node?.tag as Heading
                  return <Tag key={index}>{serializedChildren}</Tag>
              }
              case 'list': {
                  const node = _node as SerializedListNode

                  type List = Extract<keyof JSX.IntrinsicElements, 'ol' | 'ul'>
                  const Tag = node?.tag as List
                  return (
                      <Tag className={node?.listType} key={index}>
                          {serializedChildren}
                      </Tag>
                  )
              }
              case 'listitem': {
                  const node = _node as SerializedListItemNode

                  if (node?.checked != null) {
                      return (
                          <li
                              aria-checked={node.checked ? 'true' : 'false'}
                              className={`component--list-item-checkbox ${
                                  node.checked
                                      ? 'component--list-item-checkbox-checked'
                                      : 'component--list-item-checked-unchecked'
                              }`}
                              key={index}
                              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                              role="checkbox"
                              tabIndex={-1}
                              value={node?.value}
                          >
                              {serializedChildren}
                          </li>
                      )
                  } else {
                      return (
                          <li key={index} value={node?.value}>
                              {serializedChildren}
                          </li>
                      )
                  }
              }
              case 'quote': {
                  const node = _node as SerializedQuoteNode

                  return <blockquote key={index}>{serializedChildren}</blockquote>
              }
              case 'link': {
                  const node = _node as any

                  const fields: any = node.fields

                  if (fields.linkType === 'custom') {
                      // const rel = fields.newTab ? 'noopener noreferrer' : undefined

                      return (
                          <a
                              rel={`noreferrer noopener`}
                              href={fields.url}
                              key={index}
                              target={
                                  fields.newTab ||
                                  !fields.url.includes(`localhost`)
                                      ? '_blank'
                                      : undefined
                              }
                              className={classes.small}
                              data-open-in-church-center-modal={'true'}
                          >
                              {serializedChildren}
                              <span>{icons.newWindow}</span>
                          </a>
                      )
                  } else if (fields.linkType === 'internal') {
                      let relation = fields.doc.relationTo
                      if (relation === 'pages') {
                          return (
                              <Link
                                  href={`${
                                      fields?.doc?.value?.parentPage ? `${fields.doc.value.parentPage}/` : ''
                                  }/${fields?.doc?.value?.slug || ``}`}
                                  target={fields.newTab ? '_blank' : undefined}
                                  key={index}
                              >
                                  {serializedChildren}
                              </Link>
                          )
                      } else if (relation === 'series') {
                          return (
                              <Link
                                  href={`/series/${fields.doc.value.slug}`}
                                  target={fields.newTab ? '_blank' : undefined}
                                  key={index}
                              >
                                  {serializedChildren}
                              </Link>
                          )
                      } else if (relation === 'messages') {
                          let href
                          if (fields.doc.value.meta.series) {
                              href = `/messages/${fields.doc.value.meta.series.slug}/${fields.doc.value.slug}`
                          } else {
                              href = `/messages/${fields.doc.value.slug}`
                          }
                          return (
                              <Link href={href} target={fields.newTab ? '_blank' : undefined} key={index}>
                                  {serializedChildren}
                              </Link>
                          )
                      } else if (relation === 'events') {
                          return (
                              <Link
                                  href={`/events/${fields.doc.value.slug}`}
                                  target={fields.newTab ? '_blank' : undefined}
                                  key={index}
                              >
                                  {serializedChildren}
                              </Link>
                          )
                      } else {
                          break
                      }
                  } else {
                      break
                  }
              }
              case 'relationship': {
                  const node = _node as any
                  if (node.relationTo === 'addresses') {
                      return (
                          <address key={index} className={classes.address}>
                              <p>{node?.value?.streetAddress || ``}</p>
                              {node?.value?.optionalAdditionalStreetAddress && (
                                  <p>{node.value.optionalAdditionalStreetAddress}</p>
                              )}
                              <p>
                                  {node?.value?.city && `${node.value.city},`} {node?.value?.state}{' '}
                                  {node?.value?.zip}
                              </p>
                          </address>
                      )
                  } else {
                      break
                  }
              }

              case 'upload': {
                  return (
                      <div key={index}>
                          <RichTextUpload node={_node as any}/>
                      </div>
                  )
              }

              case 'block': {
                  const node = _node as any
                  const fields = node.fields
                if (fields.active) {
                  return (
                    <div key={index}>
                      <RenderBlocks blocks={fields}/>
                    </div>
                  )
                }
              }
              default:
                  return null
          }
          return null
      })}
    </span>
    )
}
