import isPlainObject from 'is-plain-object'
import invariant from 'fbjs/lib/invariant'
import { defaultExpandOpts, isCompact, isNullish } from './util'

export const expand = (
  raw,
  opts = {}
) => {
  const { createBlock } = { ...defaultExpandOpts, ...opts }

  invariant(
    isPlainObject(raw),
    'Raw contentState must be a plain object.'
  )
  const blocks = raw.blocks.reduce((acc, block) => {
    if (isNullish(block)) {
      return acc
    }
    if (typeof block === 'string') {
      acc.push(createBlock({ text: block }))
    } else if (isCompact(block)) {
      acc.push(createBlock(block))
    } else {
      acc.push(block)
    }
    return acc
  }, [])

  return {
    blocks,
    entityMap: (raw.entityMap || {})
  }
}
