import React from 'react'
import {
  Link
} from 'react-router-dom'

const Header = () => (
  <div>
    <ul>
      <li><Link to="/">主页</Link></li>
      <li><Link to="/topics">话题</Link></li>
      <li><Link to="/aboute">关于</Link></li>
    </ul>
  </div>
)

export default Header
