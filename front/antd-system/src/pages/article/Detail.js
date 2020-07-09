import React, { useState, useEffect } from 'react'

import { queryArticleDetail } from '@/api'
import ReactMde from '@/pages/editors/components/Mde'

const ArticleDetail = props => {
  const [articleDetail, setArticleDetail] = useState()
  useEffect(() => {
    const data = {
      id: props.match.params.id
    }
    queryArticleDetail(data).then(res => {
      if (res.data.code === 1) {
        setArticleDetail(res.data.data)
        console.log(articleDetail)
      }
    })
  }, [articleDetail, props.match.params.id])

  return (
    <div className="article-detail">
      <ReactMde />
    </div>
  )
}

export default ArticleDetail
