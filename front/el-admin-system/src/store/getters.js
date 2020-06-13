export default {
  token: state => state.user.token,
  roles: state => state.user.roles && state.user.roles.split('-') || [],
  permission_routes: state => state.permission.routes
}
