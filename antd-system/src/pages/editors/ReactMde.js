import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Button } from 'antd';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const ReactMdeEditor = () => {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");

  const getVal = (val) => {
    console.log(val)
  }

  return (
    <div className="editor">
        <p className="title">React Mde</p>
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
        <Button onClick={() => getVal(value)}>打印</Button>
    </div>
  );
}

export default ReactMdeEditor