import React from 'react'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import wishcastrImg from '../assets/wishcastr-sample.png'
import numberGuessingImg from '../assets/numberguessing-sample.png'
import blackjackImg from '../assets/blackjack-sample.png'
import battleshipImg from '../assets/battleship-sample.png'
import weatherReportImg from '../assets/weatherreport-sample.png'

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
          <h2>Wishcastr</h2>
          <OutboundLink href="https://github.com/wishcastr/wishcastr">
            <img src={wishcastrImg} alt="Wishcastr" />
            GitHub
          </OutboundLink>
          <p className="italic">curently does not work since Amazon API key expired</p>
          <p>Major functions:</p>
          <ul>
            <li>Users can set price thresholds on products and get notified when those products hit the threshold.</li>
            <li>Built on Rails 5 (API backend) and AngularJS 1.4 (Frontend)</li>
            <li>OAuth with Amazon Login</li>
            <li>Completely custom; no additional Ruby gems, CSS frameworks, or third-party Angular libaries.</li>
            <li>Background cron job to manage price updates</li>
            <li>Email notifications through Mailgun</li>
            <li>Consumes and normalizes Amazon Product Advertising API.</li>
          </ul>
        </article>


        <article>
          <h2>Command-line Utilities (for fun)</h2>
          <div className="flex flex-wrap">
            <OutboundLink className="w-1/2 p-2" href="https://github.com/dbernheisel/weather_report">
              <img src={weatherReportImg} alt="WeatherReport" />
            </OutboundLink>
            <OutboundLink className="w-1/2 p-2" href="https://github.com/dbernheisel/battleship">
              <img src={battleshipImg} alt="Battleship" />
            </OutboundLink>
            <OutboundLink className="w-1/2 p-2" href="https://github.com/dbernheisel/blackjack_advisor">
              <img src={blackjackImg} alt="Blackjack" />
            </OutboundLink>
            <OutboundLink className="w-1/2 p-2" href="https://github.com/dbernheisel/guessing_game">
              <img src={numberGuessingImg} alt="Number Guessing Game" />
            </OutboundLink>
          </div>
        </article>
      </Layout>
    )
  }
}

export default ProjectsPage
