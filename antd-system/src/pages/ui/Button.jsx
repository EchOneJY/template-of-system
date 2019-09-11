import React, { useState, useEffect } from 'react';
import { Button } from 'antd'

function ButtonCustom() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('banana');

  const changeFruit = (e) => {
    return e === 'banana'?'apple':'banana'
  }

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <p>fruit:{fruit}</p>
      <Button onClick={() => setFruit(changeFruit)}>
        change
      </Button>
    </div>
  );
}
export default ButtonCustom;