import React from 'react'
import { Row, Col, Card } from 'antd'
import SvgIcon from './components/svgIcon'
import iconList from './components/iconList'

const CustomerIcons = props => {
  return (
    <Row className="icon-list" gutter={[10, 10]}>
      {iconList.map((icon, i) => {
        return (
          <Col
            className="icon-item"
            key={i}
            xs={{ span: 6 }}
            sm={{ span: 8 }}
            md={{ span: 3 }}
            lg={{ span: 2 }}
            xl={{ span: 2 }}
          >
            <Card hoverable>
              <SvgIcon name={icon} />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default CustomerIcons
