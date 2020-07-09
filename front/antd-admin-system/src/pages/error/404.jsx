import React from 'react'
import { Button, Result } from 'antd'

const NotFoundPage = props => (
  <div className="not-found">
    <Result
      status="404"
      title="404"
      ssubTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => props.history.push('/')}>
          Back Home
        </Button>
      }
    />
  </div>
)

export default NotFoundPage
