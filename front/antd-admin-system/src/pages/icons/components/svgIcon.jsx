import React from 'react'

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

const SvgIcon = props => {
  return (
    <span>
      <svg>
        <use xlinkHref={`#icon-${props.name}`}></use>
      </svg>
    </span>
  )
}

export default SvgIcon
