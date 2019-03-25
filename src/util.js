import { convertToRaw as convertFromDraftStateToRaw, genKey } from 'draft-js'
import isPlainObject from 'is-plain-object'

export const instanceOfContentState = maybeContentState =>
  maybeContentState?.constructor?.name === 'ContentState'

export const instanceOfEditorState = maybeEditorState => 
  maybeEditorState?.constructor?.name === 'EditorState'

export const instanceOfContentBlock = maybeContentBlock =>
  maybeContentBlock?.constructor?.name === 'ContentBlock'

export const isNullish = val => typeof val === 'undefined' || val === null

export const isCompact = maybeObject =>
  isPlainObject(maybeObject) && Object.keys(maybeObject).length < 7

export const experimentalTreeDataSupport = (window.__DRAFT_GKX || {}).draft_tree_data_support

const defaultBlockProperties = {
  data: {},
  depth: 0,
  entityRanges: [],
  inlineStyleRanges: [],
  text: '',
  type: 'unstyled'
}

const blockProperties = experimentalTreeDataSupport
  ? {
    ...defaultBlockProperties,
    parent: null,
    children: [],
    prevSibling: null,
    nextSibling: null
  }
  : defaultBlockProperties

export const defaultExpandOpts = {
  createBlock: (block) => ({
    key: genKey(),
    ...blockProperties,
    ...block  
  })
}

export const defaultCompressOpts = {
  discardKeys: false,
  convertToRaw: convertFromDraftStateToRaw
}
  