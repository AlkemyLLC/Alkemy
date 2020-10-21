/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
require('./src/assets/css/layout.css')
require('./src/assets/css/style.css')
require('./src/assets/css/animate.css')
require("@fortawesome/fontawesome-svg-core/styles.css");

exports.onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `The Alkemy website has been updated. ` +
      `Would you like to reload and display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}

exports.onRouteUpdate = (args) => {
  if (typeof window !== `undefined` && args.location.action===`PUSH`) { window.scrollTo(0, 0)}
}

exports.onClientEntry = () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (!(`IntersectionObserver` in window)) {
        require(`intersection-observer`);
        console.log(`# IntersectionObserver is polyfilled!`);
    }
};