import React from 'react'
import Nav from './nav'

import '../css/index.css'

import 'prism-themes/themes/prism-ghcolors.css'
// import 'prism-themes/themes/prism-xonokai.css'

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    return (
      <div>
        <Nav location={location}/>
        <main className="max-w-3xl p-4 m-auto text-lg">
          {children}
        </main>
      </div>
    )
  }
}

export default Template
