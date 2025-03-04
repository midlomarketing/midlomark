'use client'

import {$isRangeSelection, FORMAT_TEXT_COMMAND} from "@payloadcms/richtext-lexical/lexical";
import type {ToolbarGroup} from "@payloadcms/richtext-lexical";

import {createClientFeature} from "@payloadcms/richtext-lexical/client";
import {toolbarFormatGroupWithItems} from "@payloadcms/richtext-lexical/client";
import {HighlightIcon} from "@/utilities/features/colorAccent/Highlight";

const toolbarGroups: ToolbarGroup[] = [
  toolbarFormatGroupWithItems([
    {
      ChildComponent: HighlightIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          return selection.hasFormat('highlight')
        }
        return false
      },
      key: 'highlight',
      onSelect: ({ editor }) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')
      },
      order: 1,
    },
  ]),
]

export const HighlightFeatureClient = createClientFeature(({ featureProviderMap }) => {
  return {
    toolbarFixed: {
      groups: toolbarGroups,
    },
    toolbarInline: {
      groups: toolbarGroups,
    },
  }
})
