import React from 'react'
import Clock from './Clock'

class Home extends React.Component {
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
