import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from 'schema/index'
import { plugins } from 'plugin/index'
import './index.scss'

class PowerEditor {
  editor: EditorView
  init(selector: string) {
    let tarDom = document.querySelector(selector)
    this.editor = new EditorView(tarDom, {
      state: EditorState.create({
        schema,
        plugins,
      }),
    })
  }
}
export let powerEditor = new PowerEditor()
