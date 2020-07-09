import React from 'react'
import { Button, Result } from 'antd'

const NotFoundPage = props => (
  <div className="not-found">
    <Result
      status="403"
      title="403"
      ssubTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => props.history.push('/')}>
          Back Home
        </Button>
      }
    />
  </div>
)

export default NotFoundPage
