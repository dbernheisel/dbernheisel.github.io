import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Link from '../components/link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import get from 'lodash/get'

import Layout from '../components/layout'

const BlogFooter = props => {
  const { previous, next } = props.pageContext
  return (
    <div className="flex flex-wrap justify-between">
      {previous && (
        <div className="w-full p-2 lg:w-1/2">
          <Link className="inline-flex items-center flex-1 dark:button-dark button" to={previous.fields.slug} rel="prev">
            <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1408 960v-128q0-26-19-45t-45-19h-502l189-189q19-19 19-45t-19-45l-91-91q-18-18-45-18t-45 18l-362 362-91 91q-18 18-18 45t18 45l91 91 362 362q18 18 45 18t45-18l91-91q18-18 18-45t-18-45l-189-189h502q26 0 45-19t19-45zm256-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
            <span>{previous.frontmatter.title}</span>
          </Link>
        </div>
      )}

      {next && (
        <div className="w-full p-2 lg:w-1/2">
          <Link className="inline-flex items-center flex-1 dark:button-dark button" to={next.fields.slug} rel="next">
            <span>{next.frontmatter.title}</span>
            <svg className="w-6 h-6 ml-2 fill-current" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1413 896q0-27-18-45l-91-91-362-362q-18-18-45-18t-45 18l-91 91q-18 18-18 45t18 45l189 189h-502q-26 0-45 19t-19 45v128q0 26 19 45t45 19h502l-189 189q-19 19-19 45t19 45l91 91q18 18 45 18t45-18l362-362 91-91q18-18 18-45zm251 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
          </Link>
        </div>
      )}
    </div>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const originalUrl = get(this.props, 'data.markdownRemark.frontmatter.originalUrl')
    const siteDescription = post.excerpt

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[
            {name: 'description', content: siteDescription },
            {name: 'twitter:creator', content: "@bernheisel" }
          ]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />

        <article className="blog-post">
          <h1 className="post-content text-3xl">{post.frontmatter.title}</h1>
          <p className="mt-2 mb-4 text-sm frontmatter">
            <span>
              Published on {post.frontmatter.date}
            </span>
            {originalUrl && (
              <span>
                <span className="mx-2">|</span>
                <OutboundLink href={originalUrl}>Original Publishing</OutboundLink>
              </span>
            )}
            {post.timeToRead && (
              <span>
                <span className="mx-2">|</span>
                {post.timeToRead}m read
              </span>
            )}
          </p>
          <div className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <BlogFooter {...this.props} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      timeToRead
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        originalUrl
      }
    }
  }
`
