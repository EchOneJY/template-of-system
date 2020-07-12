const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  // console.log(i)
  return i.match(re)[1]
})

export default svgIcons
