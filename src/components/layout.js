import React from 'react'
import Nav from './nav'

import '../css/index.css'
import 'gatsby-remark-vscode/styles.css';

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
