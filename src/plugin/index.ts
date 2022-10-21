import { schema } from '../schema/index'
import { Plugin, Transaction, EditorState, TextSelection } from 'prosemirror-state'
let arr = []
let createPlugin = () => {
  let plugin: Plugin<{ transform: Transaction; from: number; to: number; text: string } | null> = new Plugin({
    state: {
      init() {
        return null
      },
      apply(this: typeof plugin, tr, prev) {
        let stored = tr.getMeta(this)
        if (stored) return stored
        return tr.selectionSet || tr.docChanged ? null : prev
      },
    },

    props: {
      handleTextInput(view, from, to, text) {
        return run(view, from, to, text, rules, plugin)
      },
      handleDOMEvents: {
        compositionend: (view) => {
          setTimeout(() => {
            let { $cursor } = view.state.selection as TextSelection
            if ($cursor) run(view, $cursor.pos, $cursor.pos, '', rules, plugin)
          })
        },
      },
    },

    isInputRules: true,
  })
  return plugin
}
export let plugins = arr
