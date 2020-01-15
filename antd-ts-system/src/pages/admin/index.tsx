import * as React from 'react';

export interface AdminProps {
  
}
 
export interface AdminState {
  
}
 
class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
    this.state = { collapse: false };
  }
  render() { 
    return ( <div>Admin</div> );
  }
}
 
export default Admin;