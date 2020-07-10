import React, { useState, memo } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

const ReactMdeEditor = memo(props => {
  console.log('ReactMdeEditor')

  const [value, setValue] = useState(props.value)
  const [selectedTab, setSelectedTab] = useState(props.selectedTab)

  return (
    <ReactMde
      className="mde"
      minEditorHeight={350}
      minPreviewHeight={350}
      value={value || props.value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      readOnly={props.readOnly || false}
    />
  )
})

export default ReactMdeEditor
