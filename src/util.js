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

export const defaultExpandOpts = {
  createBlock: (block) => ({
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: genKey(),
    text: '',
    type: 'unstyled',
    ...block  
  })
}

export const defaultCompressOpts = {
  discardKeys: false,
  convertToRaw: convertFromDraftStateToRaw
}
  