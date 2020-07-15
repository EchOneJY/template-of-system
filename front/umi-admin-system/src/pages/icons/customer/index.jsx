import React from 'react';
import { Row, Col, Card } from 'antd';
import { ReactSVG } from 'react-svg';

import iconList from './iconList';

const CustomerIcons = () => {
  return (
    <Row className="icon-list" gutter={[10, 10]}>
      {iconList.map((icon, i) => {
        return (
          <Col
            key={i}
            className="icon-item"
            xs={{ span: 6 }}
            sm={{ span: 8 }}
            md={{ span: 3 }}
            lg={{ span: 2 }}
            xl={{ span: 2 }}
          >
            <Card hoverable>
              <ReactSVG src={icon} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CustomerIcons;
