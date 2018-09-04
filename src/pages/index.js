import React from 'react'
import { Link, graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

const PostDataPoint = ({field, children}) => {
  if (field) {
    return (
      <span>
        <span className="mx-2">|</span>
        {children}
      </span>
    )
  } else {
    return null
  }
}

const PostSubHeader = ({post}) => {
  const tags = get(post, 'frontmatter.tags') || []

  return (
    <div className='frontmatter mb-2 mt-0'>
      <span>{post.frontmatter.date}</span>
      <PostDataPoint field={post.frontmatter.originalUrl}>
        <OutboundLink href={post.frontmatter.originalUrl}>
          Original Publishing
        </OutboundLink>
      </PostDataPoint>
      <PostDataPoint field={post.timeToRead}>
        <span>{post.timeToRead}m Read</span>
      </PostDataPoint>
      <PostDataPoint field={tags.some(() => true)}>
        {tags.map(tag => {
          return (
            <span key={tag} className='ml-2'>{tag}</span>
          )}
        )}
      </PostDataPoint>
    </div>
  )
}

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const excerpt = get(node, 'frontmatter.excerpt') || node.excerpt

          return (
            <div key={node.fields.slug} className='mb-12 mt-0'>
              <h1 className='mb-0 post-header'>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h1>
              <PostSubHeader post={node} />
              <p className='leading-normal' dangerouslySetInnerHTML={{ __html: excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            tags
            originalUrl
            excerpt
          }
        }
      }
    }
  }
`
