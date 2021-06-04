const config = {
  // Project title. Used as SEO title and PWA name
  title: 'Alkemy',
  // Project short name. Used by PWA
  shortTitle: 'Alkemy',
  // Project description. Used in SEO meta tag and by PWA
  description:
    'Make your next Web Development, Design, eCommerce, or Marketing project a success with Alkemy. Well Crafted, Pixel Perfect, Conversion Optimized Results.',
  // Keywords describing the project. Used in SEO meta tag
  keywords: [
    'Web Design Company',
    'Web Design and Development',
    'custom software development company',
    'Wordpress website design',
    'web design agency',
    'responsive web design',
    'Web Development Company',
    'Digital Marketing Agency',
    'Digital Marketing services',
    'Best Website Design',
    'web application development',
  ],
  // Absolute deployment path (without trailing slash). Used as base URL in SEO meta tags
  baseUrl: 'https://www.alkemydev.com',
  // Site language. Added in html tag and PWA manifest
  lang: 'en',
  // Your username on Facebook. Used in SEO meta tags
  facebookUsername: 'alkemydev',
  // Your username on Twitter (without @). Used in SEO meta tags
  twitterUsername: 'alkemydev',
  // Your username on Linkedin. Used in SEO meta tags
  linkedinUsername: 'alkemydev',
  // Path to main favicon. Recommended size: 512x512. Other sizes are generated automatically
  favicon: 'src/images/favicon.png',
  // Theme color. Used as color of device toolbar in supported browsers
  themeColor: '#362066',
  // Background color. Used as background on PWA launch screen. Recommended to make it the same as body color
  backgroundColor: '#362066',
}

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    baseUrl: config.baseUrl,
    lang: config.lang,
    facebookUsername: config.facebookUsername,
    twitterUsername: config.twitterUsername,
    linkedinUsername: config.linkedinUsername,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: `https://alkemy.flywheelsites.com/graphql`,
        auth: {
          htaccess: {
            username: process.env.HTTPBASICAUTH_USERNAME,
            password: process.env.HTTPBASICAUTH_PASSWORD,
          },
        },
        schema: {
          perPage: 20, // currently set to 100
          requestConcurrency: 5, // currently set to 15
          previewRequestConcurrency: 2, // currently set to 5
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        display: 'standalone',
        name: config.title,
        short_name: config.shortTitle,
        description: config.description,
        lang: config.lang,
        icon: config.favicon,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
      },
    },
    'gatsby-plugin-offline',
  ],
}
