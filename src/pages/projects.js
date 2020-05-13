import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

class ProjectsPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />

        <article>
          <h2>DateTimeParser</h2>
          <OutboundLink href="https://github.com/taxjar/date_time_parser">
            GitHub
          </OutboundLink>
          <p>Major functions:</p>
          <ul>
            <li>Parse an Elixir DateTime, NaiveDateTime, Date, or Time from a string</li>
            <li>Tokenizes found parts of the datetime through binary matching</li>
            <li>Suppors major ISO formats</li>
            <li>Supports arbitrary formats, eg "Saturday, Jan-34-04"</li>
          </ul>
        </article>

        <article>
          <h2>NewTab Notes - Chrome Extension</h2>
          <OutboundLink href="https://github.com/dbernheisel/MarkdownTab">
            GitHub
          </OutboundLink>
          <div className="inline-block px-2"></div>
          <OutboundLink href="https://chrome.google.com/webstore/detail/newtab-notes/kfbhbipgippofpifimbcnbafehjndccn">
            Published on the Chrome Web Store
          </OutboundLink>
          <p>Major functions:</p>
          <ul>
            <li>Replace the Chrome New Tab with a markdown page.</li>
            <li>Customize the look of what's rendered.</li>
            <li>Built with VueJS and Tailwind CSS</li>
            <li>Built purely for my own use.</li>
          </ul>
        </article>
      </Layout>
    )
  }
}

export default ProjectsPage
