import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            nodes: [
              {
                object: 'text',
                text: 'A line of text in a paragraph.',
              }
            ]
          }
        ]
      }
    ]
  }
})

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

function BoldMark(props) {
  return <strong>{props.children}</strong>
}

export default class App extends React.Component {
  state = {
    value: initialValue
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()
    switch (event.key) {
      case 'b':
        event.preventDefault()
        editor.toggleMark('bold')
        break
      case '`':
        event.preventDefault()
        const isCode = editor.value.blocks.some(block => block.type === 'code')
        editor.setBlocks(isCode ? 'paragraph' : 'code')
        break
      default:
        return next()
    }
  }

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      default:
        return next()
    }
  }
  
  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      default:
        return next()
    }
  }

  render() {
    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderBlock={this.renderBlock}
        renderMark={this.renderMark}
      />
    )
  }
}