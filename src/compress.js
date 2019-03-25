import {
  instanceOfContentState,
  instanceOfEditorState,
  instanceOfContentBlock,
  defaultCompressOpts,
  experimentalTreeDataSupport
} from './util'
import invariant from 'fbjs/lib/invariant'

export const compressRawBlock = opts => block => {
  invariant(
    !instanceOfContentBlock(block),
    'block is not a raw block'
  )
  const {
    data,
    depth,
    entityRanges,
    inlineStyleRanges,
    key,
    text,
    type
  } = block
  const compact = {}
  if (Object.keys(data || {}).length) {
    compact.data = data
  }
  if (depth) {
    compact.depth = depth
  }
  if (entityRanges?.length) {
    compact.entityRanges = entityRanges
  }
  if (inlineStyleRanges?.length) {
    compact.inlineStyleRanges = inlineStyleRanges
  }
  if (!opts.discardKeys && key) {
    compact.key = key
  }
  if (text) {
    compact.text = text
  }
  if (type !== 'unstyled') {
    compact.type = type
  }
  if (experimentalTreeDataSupport) {
    compact.parent = block.parent || null
    compact.nextSibling = block.nextSibling || null
    compact.prevSibling = block.prevSibling || null
    compact.children = block.children || []
  }
  return compact
}

export const compress = (raw, opts = {}) => {
  let rawContentState = raw
  const { convertToRaw, discardKeys } = { ...defaultCompressOpts, ...opts }

  if (instanceOfContentState(raw)) {
    console.warn('Provided contentState instead of raw contentState.')
    rawContentState = convertToRaw(raw)
  } else if (instanceOfEditorState(raw)) {
    console.warn('Provided editorState instead of raw contentState.')
    rawContentState = convertToRaw(raw.getCurrentContent())
  }

  const blocks = rawContentState.blocks.map(compressRawBlock({ discardKeys }))
  if (!Object.keys(rawContentState.entityMap || {}).length) {
    return { blocks }
  }
  return {
    blocks,
    entityMap: rawContentState.entityMap
  }
}