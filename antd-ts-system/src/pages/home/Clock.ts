import React from 'react'
import { Button } from 'antd'

const Clock: React.FC = ({ handleClick }) => {
  return (
    <div>
      <span>{new Date().toLocaleDateString()}</span>
      <Button onClick={handleClick}>点击</Button>
    </div>
  )
}

export default Clock
