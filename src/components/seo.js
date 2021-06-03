/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

 import React from "react";
 import PropTypes from "prop-types";
 import Helmet from "react-helmet";
 import { useStaticQuery, graphql } from "gatsby";
 import { TypographyStyle, GoogleFont } from "react-typography";
 import typography from "../utils/typography";
 
 
 import logo from "../assets/images/alkemy-logo-vertical.png";
 import screenshot from "../assets/images/alkemy-website-screenshot.png";
 import msTileImg from "../assets/images/favicons/ms-icon-144x144.png";
 
 import appleIcon57 from "../assets/images/favicons/apple-icon-57x57.png";
 import appleIcon60 from "../assets/images/favicons/apple-icon-60x60.png";
 import appleIcon72 from "../assets/images/favicons/apple-icon-72x72.png";
 import appleIcon76 from "../assets/images/favicons/apple-icon-76x76.png";
 import appleIcon114 from "../assets/images/favicons/apple-icon-114x114.png";
 import appleIcon120 from "../assets/images/favicons/apple-icon-120x120.png";
 import appleIcon144 from "../assets/images/favicons/apple-icon-144x144.png";
 import appleIcon152 from "../assets/images/favicons/apple-icon-152x152.png";
 import appleIcon180 from "../assets/images/favicons/apple-icon-180x180.png";
 
 import androidIcon192 from "../assets/images/favicons/android-icon-192x192.png";
 
 import favicon16 from "../assets/images/favicons/favicon-16x16.png";
 import favicon32 from "../assets/images/favicons/favicon-32x32.png";
 import favicon96 from "../assets/images/favicons/favicon-96x96.png";
 
 const windowGlobal = typeof window!=="undefined" ? window : null;
 
 function SEO({
     description,
     lang,
     meta,
     author,
     title,
     keywords,
     children,
     date,
     coverImage,
     coverDescription,
     images,
     dateModified,
     publisher
 }) {
     const { site } = useStaticQuery(
         graphql`
             query {
                 site {
                     siteMetadata {
                         siteUrl
                         title
                         description
                         author
                         keywords
                     }
                 }
             }
         `
     );
 
     const ogImage = coverImage ? coverImage : screenshot;
     const ogImageText = coverDescription
         ? coverDescription
         : "Screenshot of the Alkemy Website.";
     const metaDescription = description
         ? description
         : site.siteMetadata.description;
     const siteUrl = site.siteMetadata.siteUrl;
     const pageAuthor = author ? author : site.siteMetadata.author;
     const pageKeywords = keywords ? keywords : site.siteMetadata.keywords;
     const siteAddress = site.siteMetadata.siteUrl;
             
     /* Structed Data Schema */
     const articleDate = date ? date : "2001-01-01";
     const articleURL =
         typeof window !== "undefined" ? window.location.href : "";
     return (
         <Helmet
             title={title}
             titleTemplate={`%s | ${site.siteMetadata.title}`}
             meta={[
                 { name: "charset", content: "UTF-8" },
                 {
                     name: "viewport",
                     content:
                         "width=device-width, initial-scale=1, maximum-scale=1",
                 },
                 { httpEquiv: "X-UA-Compatible", content: "IE=edge,chrome=1" },
             ].concat(meta)}
         >
             <html lang={lang ? lang : "en"} />
             <TypographyStyle typography={typography} />
             <GoogleFont typography={typography} />

             <meta
                 name="msvalidate.01"
                 content="304B53089DF131D38A8031F5232E9FB1"
             />

             <meta name="description" content={metaDescription} />
             <meta name="keywords" content={pageKeywords} />
             <meta name="author" content={pageAuthor} />

             <meta name="apple-mobile-web-app-title" content="Alkemy" />

             <meta property="og:image" content={siteUrl + ogImage} />
             <meta property="og:title" content={title} />
             <meta property="og:description" content={metaDescription} />
             <meta property="og:type" content="website" />

             <meta name="twitter:card" content="summary" />
             <meta name="twitter:creator" content={pageAuthor} />
             <meta name="twitter:title" content={title} />
             <meta name="twitter:description" content={metaDescription} />
             <meta name="twitter:image" content={siteUrl + ogImage}></meta>
             <meta name="twitter:image:alt" content={ogImageText} />
             <link rel="preconnect" href="https://fonts.googleapis.com" />
             <link rel="preconnect" href="https://app.upcity.com" />
             <link
                 rel="canonical"
                 href={
                     windowGlobal && windowGlobal.location
                         ? windowGlobal.location.href
                         : ""
                 }
             />
             <meta name="msapplication-TileImage" content={msTileImg} />
             <meta name="msapplication-TileColor" content="#ffffff" />

             {/* App Icons and Favicon */}
             <link rel="apple-touch-icon" sizes="57x57" href={appleIcon57} />
             <link rel="apple-touch-icon" sizes="60x60" href={appleIcon60} />
             <link rel="apple-touch-icon" sizes="72x72" href={appleIcon72} />
             <link rel="apple-touch-icon" sizes="76x76" href={appleIcon76} />
             <link rel="apple-touch-icon" sizes="114x114" href={appleIcon114} />
             <link rel="apple-touch-icon" sizes="120x120" href={appleIcon120} />
             <link rel="apple-touch-icon" sizes="144x144" href={appleIcon144} />
             <link rel="apple-touch-icon" sizes="152x152" href={appleIcon152} />
             <link rel="apple-touch-icon" sizes="180x180" href={appleIcon180} />
             <link
                 rel="icon"
                 type="image/png"
                 sizes="192x192"
                 href={androidIcon192}
             />
             <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
             <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
             <link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
             <link
                 href="https://fonts.googleapis.com/css?family=Calligraffitti|Raleway:500&display=swap"
                 rel="stylesheet"
             />

             <script defer type="application/ld+json">
                 {
                   `{
                      "@context":"https://schema.org",
                      "@type":"WebSite",
                      "url":"${siteAddress}",
                      "name":"Alkemy"
                    }`
                  }
                </script>
                <script defer type="application/ld+json">
                  {`{
                      "@context":"https://schema.org",
                      "@type":"Organization",
                      "url":"${siteAddress}",
                      "name":"Alkemy",
                      "logo": "${siteAddress}${logo}",
                      "sameAs":[
                        "https://www.facebook.com/alkemydev",
                        "https://www.twitter.com/alkemydev",
                        "https://www.linkedin.com/company/alkemydev"
                      ]
                    }`}
                </script>
                <script defer type="application/ld+json">
                  {
                    `{
                      "@context": "https://schema.org/", 
                      "@type": "BreadcrumbList", 
                      "itemListElement": [{
                        "@type": "ListItem", 
                        "position": 1, 
                        "name": "Home",
                        "item": "${siteAddress}"  
                      },{
                        "@type": "ListItem", 
                        "position": 2, 
                        "name": "Responsive Web Design",
                        "item": "${siteAddress}/responsive-web-design"  
                      },{
                        "@type": "ListItem", 
                        "position": 3, 
                        "name": "Web Development",
                        "item": "${siteAddress}/web-development"  
                      },{
                        "@type": "ListItem", 
                        "position": 4, 
                        "name": "eCommerce Design",
                        "item": "${siteAddress}/ecommerce-design"  
                      },{
                        "@type": "ListItem", 
                        "position": 5, 
                        "name": "Wordpress Care Plans",
                        "item": "${siteAddress}/wordpress-care-plans"  
                      },{
                        "@type": "ListItem", 
                        "position": 6, 
                        "name": "Digital Marketing",
                        "item": "${siteAddress}/digital-marketing"  
                      },{
                        "@type": "ListItem", 
                        "position": 7, 
                        "name": "About Alkemy",
                        "item": "${siteAddress}/about-alkemy"  
                      },{
                        "@type": "ListItem", 
                        "position": 8, 
                        "name": "Alkemy Blog",
                        "item": "${siteAddress}/alkemy-blog"  
                      },{
                        "@type": "ListItem", 
                        "position": 9, 
                        "name": "Contact Alkemy",
                        "item": "${siteAddress}/contact-alkemy"  
                      }]
                    }`
                  }
              </script>
              
              {pageAuthor !== null &&
                pageAuthor !== undefined &&
                ogImage !== null &&
                articleDate !== null &&
                (<script defer type="application/ld+json">
                  {`
                  {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "name": "${title}",
                    "author": {
                      "@type": "Person",
                      "name": "${pageAuthor}"
                    },
                    "datePublished": "${articleDate}",
                    "image": "${ogImage}"
                    "url": "${articleURL}"
                  }`}
                </script>)
              }

             {children}
         </Helmet>
     );
 }
 
 SEO.defaultProps = {
     meta: [],
     keywords: `Software Development, Web Design, eCommerce Design, Digital Marketing, React, PHP, HTML, Python, Django, Gatsby, GraphQL, Wordpress Design, 3dcart, Shopify, WooCommerce, SEM, Search Engine Marketing, SEO, Search Engine Optimization, Social Media Marketing, Marketing Strategy, Web Strategy`,
 };
 
 SEO.propTypes = {
     description: PropTypes.string,
     lang: PropTypes.string,
     meta: PropTypes.arrayOf(PropTypes.object),
     title: PropTypes.string.isRequired,
     keywords: PropTypes.string,
     date: PropTypes.string,
     author: PropTypes.string,
     children: PropTypes.object,
     coverImage: PropTypes.string,
     coverDescription: PropTypes.string
 };
 
 export default SEO;