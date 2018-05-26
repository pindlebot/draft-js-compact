# draft-js-compact

The purpose of this package is to compress raw (serialized) [content state](https://draftjs.org/docs/api-reference-content-state.html). Default values are omitted from the compressed raw state. The compressed raw state can then be restored with `expand`.

- If the block type is unstyled, this property is omitted
- If the block depth is 0, this property is omitted 
- If the block data is {}, this propety is omitted, ...etc

DraftJs raw content state can be quite verbose, e.g.:

```
Colorless
green
ideas
sleep
furiously
```

becomes:

```js
{ 
  blocks: [{
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: '7k463',
    text: 'Colorless',
    type: 'unstyled'
  }, {
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: '9ksmv',
    text: 'green',
    type: 'unstyled'
  }, {
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: 'elnj6',
    text: 'ideas',
    type: 'unstyled'
  }, {
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: '6j3ci',
    text: 'sleep',
    type: 'unstyled'
  }, {
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: 'dph62',
    text: 'furiously',
    type: 'unstyled'
  }],
  entityMap: {}
}
```

## Example

```js

import { ContentState, convertToRaw } from 'draft-js'
import { compress, expand } from 'draft-js-compact'

let contentState = ContentState.createFromText('A')
let raw = convertToRaw(contentState)
/*
{
  blocks: [{
    data: {},
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    key: '7k463',
    text: 'A',
    type: 'unstyled'
  }],
  entityMap: {}
}
*/
let compressedRaw = compress(raw)
/*
{
  blocks: [{
    key: '7k463',
    text: 'A'
  }]
}
*/
let restoredRaw = expand(compressedRaw)

// returns the original raw state