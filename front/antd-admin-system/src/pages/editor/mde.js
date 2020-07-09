import * as React from 'react'
import ReactMde from './components/Mde'

const ReactMdeEditor = () => {
  return (
    <div className="editor">
      <p className="title">React Mde</p>
      <div className="editor-wrapper">
        <ReactMde />
      </div>
    </div>
  )
}

export default ReactMdeEditor
