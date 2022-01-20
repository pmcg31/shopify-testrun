require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `River Dog Woodcraft`,
    description: `Custom woodworking and furniture by the River Dog.`,
    author: `@riverdogwoodcraft`,
    siteUrl: `https://river-dog-woodcraft.myshopify.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `River Dog Woodcraft`,
        short_name: `RDWC`,
        start_url: `/`,
        background_color: `#0f0f0f`,
        theme_color: `#0f0f0f`,
        display: `minimal-ui`,
        icon: `src/images/river_dog_woodcraft_logo_031819_M11_final_logos_black_round_512x512.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    // `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-shopify`,
      options: {
        password: process.env.GATSBY_SHOPIFY_API_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
      },
    },
  ],
}
