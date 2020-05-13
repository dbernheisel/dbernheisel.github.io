import React from 'react'
import Nav from './nav'

import '../css/tailwind.css';
import 'prismjs/themes/prism-tomorrow.css'

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    return (
      <div>
        <Nav location={location}/>
        <main className="max-w-lg p-4 m-auto text-lg">
          {children}
        </main>
      </div>
    )
  }
}

export default Template
