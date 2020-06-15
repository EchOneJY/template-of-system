export default {
  token: state => state.user.token,
  role: state => state.user.role,
  permission_routes: state => state.permission.routes
}
