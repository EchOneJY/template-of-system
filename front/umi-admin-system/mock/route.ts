const routes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
  },
  {
    path: '/icon',
    title: 'Icon',
    icon: 'icon',
    children: [
      {
        path: '/icon/fontawesome',
        title: 'Fontawesome',
      },
      {
        path: '/icon/customer',
        title: 'Customer',
      },
    ],
  },
  {
    path: '/editor',
    title: 'Editor',
    icon: 'editor',
    children: [
      {
        path: '/editor/braft',
        title: 'Braft',
      },
      {
        path: '/editor/mde',
        title: 'Mde',
      },
    ],
  },
  {
    path: '/error',
    title: 'Error',
    icon: 'error',
    children: [
      {
        path: '/error/403',
        title: '403',
      },
      {
        path: '/error/404',
        title: '404',
      },
    ],
  },
];

export default {
  'GET /api/routes': routes,
};
