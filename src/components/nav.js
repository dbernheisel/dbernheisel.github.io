import React from 'react'

import profilePic from '../assets/profile-picture.jpg'
import rssIcon from '../assets/rss-feed.svg'
import Link from './link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import cx from 'classnames'

const HeaderLink = ({children}) => {
  return (
    <Link to='/'>
      <div className="flex items-center flex-shrink-0 mr-6 text-white">
        <img
          src={profilePic}
          alt='David Bernheisel'
          className='w-16 h-16 mr-4 border-2 rounded-full shadow-md lg:w-32 lg:h-32 border-teal-light'
        />
        <span className="text-2xl font-black sm:text-4xl lg:text-5xl">David Bernheisel</span>
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
      className='block px-3 py-1 mt-4 mr-4 font-medium text-white no-underline rounded shadow bg-blue-dark hover:border-blue-darker hover:bg-blue-darker lg:inline-block lg:mt-0 hover:no-underline'
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
      <nav className='flex flex-wrap items-center justify-between p-4 shadow-md bg-teal'>
        <HeaderLink />
        <div className='block lg:hidden'>
          <button
            onClick={this.menuToggle}
            className="flex items-center px-3 py-2 border rounded text-gray-light border-teal-light hover:text-white hover:border-white">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div className={navClasses}>
          <NavLink {...this.props} to='/'>Blog</NavLink>
          <NavLink {...this.props} to='/projects/'>Projects</NavLink>
          <OutboundNavLink href="https://twitter.com/bernheisel">Twitter</OutboundNavLink>
          <div className="py-1 mt-4 lg:mt-0">
            <a href='/rss.xml'>
              <img className="align-middle h-7" src={rssIcon} alt="RSS"/>
            </a>
          </div>
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
