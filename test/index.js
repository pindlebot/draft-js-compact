const { assert } = require('chai')
const { ContentState } = require('draft-js')
const { compress, expand } = require('../lib')

describe('compress', function() {
  it('should compress raw draft-js content state', function() {
    let raw = { 
      blocks: [{
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: 'A',
        text: 'A',
        type: 'unstyled'
      }]
    }
    assert.deepEqual(
      compress(raw), { blocks: [{ key: 'A', text: 'A' }] }
    )
  })
})

describe('compress', function() {
  it('should compress raw draft-js content state and prune keys', function() {
    let raw = { 
      blocks: [{
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: 'A',
        text: 'A',
        type: 'unstyled'
      }]
    }
    assert.deepEqual(
      compress(raw, { discardKeys: true }),
      { blocks: [{ text: 'A' }] }
    )
  })
})

describe('expand', function() {
  it('should expand raw, compressed draft-js content state', function() {
    let compressed = { 
      blocks: [{
        key: 'A',
        text: 'A'
      }]
    }
    assert.deepEqual(expand(compressed), {
      blocks: [{
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: 'A',
        text: 'A',
        type: 'unstyled'
      }],
      entityMap: {}
    })
  })
})

describe('expand', function() {
  it('should expand a draft-js raw content state with null and undefined values', function() {
    let expanded = expand({
      blocks: [null, undefined, 'A']
    }, {
      pruneKeys: true,
      createBlock: (block) => ({
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: 'A',
        text: '',
        type: 'unstyled',
        ...block
      })
    })
    assert.deepEqual(expanded, {
      blocks: [{
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        key: 'A',
        text: 'A',
        type: 'unstyled'
      }],
      entityMap: {}
    })
  })
})


const raw = {
  blocks: [
    'Colorless',
    'green',
    'ideas',
    'sleep',
    'furiously'
  ]
}

console.log(
 expand(raw)
)