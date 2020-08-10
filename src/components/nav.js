import React from 'react'

import profilePic from '../assets/profile-picture.jpg'
import rssIcon from '../assets/rss-feed.svg'
import Link from './link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import cx from 'classnames'

const HeaderLink = ({children}) => {
  return (
    <Link to='/'>
      <div className="flex items-center space-x-1">
        <div className="flex-shrink-0">
          <img
            src={profilePic}
            alt='David Bernheisel'
            className='w-16 avatar md:w-24 lg:w-32'
          />
        </div>
        <div>
          <h3 className="ml-0 text-xl font-bold md:ml-4 md:text-4xl md:font-extrabold leading-6">David Bernheisel</h3>
        </div>
      </div>
    </Link>
  )
}

const NavLink = ({location, to, children}) => {
  const isActive = location.pathname === to
  const classes = cx(
    {'disabled': isActive},
    'block',
    'lg:inline-block',
    'mt-4',
    'mr-4',
    'lg:mt-0',
    'button'
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
      className='block mt-4 mr-4 button lg:inline-block lg:mt-0'
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
      <nav className='flex flex-wrap items-center justify-between p-4 shadow-md navbar'>
        <HeaderLink />
        <div className='block lg:hidden'>
          <button
            onClick={this.menuToggle}
            className="flex items-center px-3 button">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div className={navClasses}>
          <NavLink {...this.props} to='/'>Blog</NavLink>
          <NavLink {...this.props} to='/projects/'>Projects</NavLink>
          <OutboundNavLink href="https://utils.zest.dev">Utilities</OutboundNavLink>
          <OutboundNavLink href="https://twitter.com/bernheisel">Twitter</OutboundNavLink>
          <div className="py-1 mt-4 lg:mt-0">
            <a href='/rss.xml'>
              <img className="h-8 align-middle" src={rssIcon} alt="RSS"/>
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
