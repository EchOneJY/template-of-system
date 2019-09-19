export default [
  {
    title: 'UI',
    icon: 'skin',
    key: '/ui',
    type: 'ui',
    children: [
      {
        title: 'Button',
        key: '/ui/button',
        icon: 'bold',
        type: 'ui'
      },
      {
        title: 'Alert',
        key: '/ui/alert',
        icon: 'alert',
        type: 'ui'
      }
    ]
  },
  {
    title: 'Editor',
    icon: 'form',
    key: '/editor',
    type: 'editor',
    children: [
      {
        title: 'Braft',
        key: '/editor/braft',
        icon: 'book',
        type: 'editor'
      },
      {
        title: 'Mde',
        key: '/editor/mde',
        icon: 'code',
        type: 'editor'
      }
    ]
  },
  {
    title: 'Charts',
    icon: 'line-chart',
    key: '/charts',
    type: 'charts',
    children: [
      {
        title: 'Echarts',
        key: '/charts/echarts',
        icon: 'pie-chart',
        type: 'charts'
      }
    ]
  }
]
