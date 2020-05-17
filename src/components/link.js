import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'

export default ({to, children, className, style}) => {
  let classNames = cx('no-underline', className)
  return (
    <Link
      className={classNames}
      to={to}
      style={style}>
      {children}
    </Link>
  )
}
