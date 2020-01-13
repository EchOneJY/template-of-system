import React from 'react'
import Clock from './Clock'
import { Dispatch } from 'redux'

interface HomeProps {
  dispatch: Dispatch<any>
}
interface HomeState {}
class Home extends React.Component<HomeProps, HomeState> {
  handleClick = () => {
    console.log(new Date())
  }

  render() {
    return (
      <div>
        <Clock handleClick={this.handleClick}></Clock>
      </div>
    )
  }
}

export default Home
