export default [
    {
        title: '文章',
        icon: 'edit',
        key: '/article',
        type: 'article',
        children: [
            {
                title: '文章列表',
                icon: 'unordered-list',
                key: '/article/list',
                type: 'article'
            },
            {
                title: '添加文章',
                icon: 'file-add',
                key: '/article/add',
                type: 'article'
            }
        ]
    },
    {
        title: '分类',
        icon: 'block',
        key: '/category/list',
        type: 'category'
    },
    {
        title: '标签',
        icon: 'tag',
        key: '/tags/list',
        type: 'tags'
    },
]