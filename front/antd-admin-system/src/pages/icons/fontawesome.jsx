import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Card } from 'antd'

library.add(fas)

const iconList = [
  'ad',
  'address-book',
  'address-card',
  'adjust',
  'air-freshener',
  'align-center',
  'align-justify',
  'align-left'
]

const FontAwesomeIcons = props => {
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
              <FontAwesomeIcon icon={icon} />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default FontAwesomeIcons
