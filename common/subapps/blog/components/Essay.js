import React from 'react'
import PropTypes from 'prop-types'

const Article = ({ price, quantity, title }) => (
  <div>
    {title} - &#36;{price}{quantity ? ` x ${quantity}` : null}
  </div>
)

Article.propTypes = {
  title: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string
}

export default Article
