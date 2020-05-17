module.exports = {
  siteMetadata: {
    title: 'David Bernheisel',
    author: 'David Bernheisel',
    description: 'A blog about development',
    siteUrl: 'https://www.bernheisel.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require("postcss-import"),
          require("tailwindcss"),
          require("autoprefixer"),
          require("postcss-preset-env")({
            browsers: "last 2 versions",
            features: {
              // https://github.com/tailwindcss/tailwindcss/issues/1190
              'focus-within-pseudo-class': false
            }
          })
        ]
      }
    },
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/assets/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        "excerpt_separator": '<!-- excerpt -->',
        plugins: [
          {
            resolve: 'gatsby-remark-audio',
            options: {
              preload: 'auto',
              loop: false,
              controls: true,
              muted: false,
              autoplay: false
            }
          },
          {
            resolve: 'gatsby-remark-video',
            options: {
              height: 'auto',
              width: 'auto',
              preload: 'auto',
              loop: true,
              controls: true,
              muted: true,
              playsinline: true,
              autoplay: true
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-9152758-1',
        respectDNT: true,
        head: true
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "David Bernheisel's Blog RSS Feed",
            match: "^/blog/",
          },
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "David Bernheisel's Blog",
        short_name: 'Bernheisel Blog',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png',
        icons: [
          {
            "src": "\/android-chrome-36x36.png",
            "sizes": "36x36",
            "type": "image\/png",
            "density": "0.75"
          },
          {
            "src": "\/android-chrome-48x48.png",
            "sizes": "48x48",
            "type": "image\/png",
            "density": "1.0"
          },
          {
            "src": "\/android-chrome-72x72.png",
            "sizes": "72x72",
            "type": "image\/png",
            "density": "1.5"
          },
          {
            "src": "\/android-chrome-96x96.png",
            "sizes": "96x96",
            "type": "image\/png",
            "density": "2.0"
          },
          {
            "src": "\/android-chrome-144x144.png",
            "sizes": "144x144",
            "type": "image\/png",
            "density": "3.0"
          },
          {
            "src": "\/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image\/png",
            "density": "4.0"
          }
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet'
  ],
}
