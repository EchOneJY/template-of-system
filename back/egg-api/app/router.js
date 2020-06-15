'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app
  const jwt = app.middleware.jwt({ app })
  router.get('/', controller.home.index)
  router.get('/routes/:role', controller.routes.match)
  router.group({ name: 'user', prefix: '/user' }, router => {
    const {
      info,
      captcha,
      login,
      isFollow,
      follow,
      unfollow,
      following,
      follower,
      articleStatus,
      likeArticle,
      cancelLikeArticle,
    } = controller.user

    router.get('/info', jwt, info)
    router.get('/captcha', captcha)
    router.post('/login', login)
    router.get('/isfollow/:id', jwt, isFollow)

    router.put('/follow/:id', jwt, follow)
    router.delete('/follow/:id', jwt, unfollow)
    router.get('/:id/following', jwt, following)
    router.get('/:id/follower', jwt, follower)

    router.get('/article/:id', jwt, articleStatus)

    router.put('/likeArticle/:id', jwt, likeArticle)
    router.delete('/likeArticle/:id', jwt, cancelLikeArticle)
  })

  router.group({ name: 'article', prefix: '/article' }, router => {
    const { create, detail, list } = controller.article
    router.post('/create', jwt, create)
    router.get('/:id', detail)
    router.get('/', list)
  })
}
