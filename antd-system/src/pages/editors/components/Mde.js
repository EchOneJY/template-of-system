import * as React from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

const ReactMdeEditor = props => {
  const [value, setValue] = React.useState(props.value)
  const [selectedTab, setSelectedTab] = React.useState(props.selectedTab)

  React.useEffect(() => {
    console.log(props)
  }, [])

  return (
    <ReactMde
      className="mde"
      minEditorHeight={350}
      minPreviewHeight={350}
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  )
}

export default ReactMdeEditor
