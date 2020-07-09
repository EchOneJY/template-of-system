import React from 'react'
import Clock from './Clock'

class Home extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    console.log(new Date())
  }

  render() {
    return (
      <div>
        Home
        <Clock handleClick={this.handleClick}></Clock>
      </div>
    )
  }
}

export default Home
