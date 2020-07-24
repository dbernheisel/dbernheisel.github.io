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
        <div className="flex flex-col space-y-4">
          <article>
            <h2 className="tracking-wider text-2xl font-bold">DateTimeParser</h2>
            <div className="space-x-4">
              <OutboundLink className="link" href="https://github.com/taxjar/date_time_parser">
                GitHub
              </OutboundLink>
              <OutboundLink className="link" href="https://hex.pm/packages/date_time_parser">
                Published on hex.pm
              </OutboundLink>
            </div>
            <p>Major functions:</p>
            <ul className="pl-4 list-disc">
              <li className="my-2">Parse an Elixir DateTime, NaiveDateTime, Date, or Time from a string</li>
              <li className="my-2">Tokenizes found parts of the datetime through binary matching</li>
              <li className="my-2">Supports major ISO formats</li>
              <li className="my-2">Supports arbitrary formats, eg "Saturday, Jan-34-04"</li>
            </ul>
          </article>

          <article>
            <h2 className="tracking-wider text-2xl font-bold">Elixir Utilities</h2>
            <div className="space-x-4">
              <OutboundLink className="link" href="https://github.com/dbernheisel/elixir-utilities-web">
                GitHub
              </OutboundLink>
              <OutboundLink className="link" href="https://elixir-utilities.herokuapp.com">
                Visit
              </OutboundLink>
            </div>
            <p>Major functions:</p>
            <ul className="pl-4 list-disc">
              <li className="my-2">LiveView-powered Regex visualizer.</li>
              <li className="my-2">See the raw result and the visualized result</li>
              <li className="my-2">You can permalink regexes to share with others</li>
              <li className="my-2">Cheatsheet and recipes</li>
            </ul>
          </article>

          <article>
            <h2 className="tracking-wider text-2xl font-bold">NewTab Notes - Chrome Extension</h2>
            <div className="space-x-4">
              <OutboundLink className="link" href="https://github.com/dbernheisel/MarkdownTab">
                GitHub
              </OutboundLink>
              <OutboundLink className="link" href="https://chrome.google.com/webstore/detail/newtab-notes/kfbhbipgippofpifimbcnbafehjndccn">
                Published on the Chrome Web Store
              </OutboundLink>
            </div>
            <p>Major functions:</p>
            <ul className="pl-4 list-disc">
              <li className="my-2">Replace the Chrome New Tab with a markdown page.</li>
              <li className="my-2">Customize the look of what's rendered.</li>
              <li className="my-2">Built with VueJS and Tailwind CSS</li>
              <li className="my-2">Built purely for my own use.</li>
            </ul>
          </article>
        </div>
      </Layout>
    )
  }
}

export default ProjectsPage
