import React from 'react';
import { history } from 'umi';
import { Button, Result } from 'antd';

const NotFoundPage = () => (
  <div className="not-found">
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  </div>
);

export default NotFoundPage;
