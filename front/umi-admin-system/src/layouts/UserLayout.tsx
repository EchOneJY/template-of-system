import React, { FC, ReactChildren } from 'react';

import Particles from 'react-particles-js';
import { ParticleConfig } from '@/pages/user/particle';

import './UserLayout.less';

interface UserProps {
  children: ReactChildren;
}

const UserLayout: FC<UserProps> = props => {
  return (
    <div className="s1-user-layout">
      <Particles className="particle-canvas" params={ParticleConfig} />
      {props.children}
    </div>
  );
};

export default UserLayout;
