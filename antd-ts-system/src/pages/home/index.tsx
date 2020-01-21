import * as React from 'react';

export interface HomeProps {
  
}
 
export interface HomeState {
  
}
 
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
  }
  render() { 
    return (
      <div >Home</div>
    );
  }
}
 
export default Home;