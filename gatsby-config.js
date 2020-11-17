const { isNil } = require(`lodash`)
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const mapPagesUrls = {
    index: `/`,
}

const {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = "https://www.example.com",
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
    siteMetadata: {
        siteUrl,
        title: `Alkemy`,
        description: `Make your next Web Development, Design, eCommerce, or Marketing project a success with Alkemy. Well Crafted, Pixel Perfect, Conversion Optimized Results.`,
        keywords: `
            Web Design Company, 
            Web Design and Development, 
            custom software development company, 
            Wordpress website design,
            web design agency,
            responsive web design,
            Web Development Company, 
            Digital Marketing Agency, 
            Digital Marketing services, 
            Best Website Design,
            web application development
            `,
        author: `@alkemydev`,
        company: `Alkemy`,
        address: `9055 Wiles Road`,
        city: `Coral Springs`,
        state: `FL`,
        zip: `33067`,
        phone: `877-4ALKEMY (425-5369)`,
        phoneDial: `8774255369`,
    },
    plugins: [
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "GTM-TRL98WJ",
                includeInDevelopment: false,
                defaultDataLayer: { platform: "gatsby" },
                routeChangeEventName: "gatsby-route-change",
            },
        },
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_ADMIN_KEY,
                queries: require("./src/utils/algolia"),
            },
        },
        {
            resolve: `gatsby-plugin-preload-fonts`,
        },
        {
            resolve: `gatsby-plugin-styled-components`,
        },
        {
            resolve: `gatsby-plugin-loadable-components-ssr`,
        },
        {
            resolve: `gatsby-plugin-minify`,
            options: {
                removeAttributeQuotes: true,
            },
        },
        {
            resolve: "gatsby-plugin-brotli",
            options: {
                extensions: ["css", "html", "js", "svg"],
            },
        },
        {
            resolve: `gatsby-plugin-react-helmet`,
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `page`,
                path: `${__dirname}/src/content/pages/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `author`,
                path: `${__dirname}/src/content/authors/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/content/posts/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
                publicPath: `${__dirname}/images/`,
            },
        },
        {
            resolve: `gatsby-transformer-json`,
        },
        {
            resolve: `gatsby-transformer-sharp`,
        },
        {
            resolve: `gatsby-plugin-sharp`,
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1035,
                            sizeByPixelDensity: true,
                            showCaptions: true,
                            linkImagesToOriginal: false,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: `language-`,
                            inlineCodeMarker: null,
                            aliases: {},
                        },
                    },
                    {
                        resolve: `gatsby-remark-external-links`,
                        options: {
                            target: null,
                            rel: `nofollow noopener noreferrer external`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-slug`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
                headers: {
                    "/*": ["cache-control: max-age=31536000, public"],
                },
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Alkemy`,
                short_name: `Alkemy`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#2bb3e5`,
                description: `Make your next Web Development, Design, eCommerce, or Marketing project a success with Alkemy. Well Crafted, Pixel Perfect, Conversion Optimized Results.`,
                lang: `en`,
                display: `standalone`,
                icon: `src/assets/images/favicons/favicon-32x32.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                sitemapSize: 5000,
            },
        },
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `alkemy`,
            },
        },

        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
        {
            resolve: `gatsby-plugin-offline`,
        },
        {
            resolve: `gatsby-plugin-eslint`,
            options: {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|.cache|public)/,
                stages: [`develop`],
                options: {
                    emitWarning: true,
                    failOnError: false,
                },
            },
        },
        {
            resolve: "gatsby-plugin-remove-console",
            options: {
                exclude: ["error", "warn"], // <- will be removed all console calls except these
            },
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                resolveEnv: () => NETLIFY_ENV,
                env: {
                    production: {
                        policy: [{ userAgent: "*" }],
                    },
                    "branch-deploy": {
                        policy: [{ userAgent: "*", disallow: ["/"] }],
                        sitemap: null,
                        host: null,
                    },
                    "deploy-preview": {
                        policy: [{ userAgent: "*", disallow: ["/"] }],
                        sitemap: null,
                        host: null,
                    },
                },
            },
        },
    ],
};