import React from 'react'

import profilePic from '../assets/profile-picture.jpg'
import Link from './link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import cx from 'classnames'

const HeaderLink = ({children}) => {
  return (
    <Link to='/'>
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <img
          src={profilePic}
          alt='David Bernheisel'
          className='w-16 h-16 lg:w-32 lg:h-32 rounded-full shadow-md border-2 border-teal-light mr-4'
        />
        <span className="text-2xl sm:text-4xl lg:text-5xl font-black">David Bernheisel</span>
      </div>
    </Link>
  )
}

const NavLink = ({location, to, children}) => {
  const isActive = location.pathname === to
  const classes = cx(
    {'bg-red': isActive},
    {'bg-blue-dark': !isActive},
    {'hover:border-blue-darker': !isActive},
    {'hover:bg-blue-darker': !isActive},
    {'text-white': !isActive},
    'font-medium',
    'block',
    'lg:inline-block',
    'mt-4',
    'mr-4',
    'lg:mt-0',
    'shadow',
    'rounded',
    'py-1',
    'px-3'
  )
  return (
    <Link className={classes} to={to}>
      {children}
    </Link>
  )
}

const OutboundNavLink = ({href, children}) => {
  return (
    <OutboundLink
      className='bg-blue-dark hover:border-blue-darker hover:bg-blue-darker text-white font-medium block lg:inline-block mt-4 mr-4 lg:mt-0 no-underline hover:no-underline shadow rounded py-1 px-3'
      href={href}>
      {children}
    </OutboundLink>
  )
}

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navOpen: false
    }
    this.menuToggle = this.menuToggle.bind(this)
  }

  render() {
    const navClasses = cx(
      'w-full block lg:mt-0 mt-4 lg:flex lg:items-center lg:w-auto',
      {'hidden': !this.state.navOpen}
    )

    return (
      <nav className='shadow-md flex items-center justify-between flex-wrap bg-teal p-6'>
        <HeaderLink />
        <div className='block lg:hidden'>
          <button
            onClick={this.menuToggle}
            className="flex items-center px-3 py-2 border rounded text-grey-light border-teal-light hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div className={navClasses}>
          <NavLink {...this.props} to='/'>Blog</NavLink>
          <NavLink {...this.props} to='/projects/'>Projects</NavLink>
          <OutboundNavLink href="https://twitter.com/bernheisel">Twitter</OutboundNavLink>
          <OutboundNavLink href="https://linkedin.com/in/bernheisel">LinkedIn</OutboundNavLink>
        </div>
      </nav>
    )
  }

  menuToggle() {
    this.setState({
      navOpen: !this.state.navOpen
    })
  }
}
