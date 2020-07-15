import React from 'react';
import { history } from 'umi';
import { Button, Result } from 'antd';

const NotFoundPage = () => (
  <div className="not-found">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  </div>
);

export default NotFoundPage;
