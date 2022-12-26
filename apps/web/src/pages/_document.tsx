import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { STATIC_ASSETS } from 'utils'

class NectarhubDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="shortcut icon"
            href={`${STATIC_ASSETS}/images/favicons/favicon.ico`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${STATIC_ASSETS}/images/favicons/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${STATIC_ASSETS}/images/favicons/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${STATIC_ASSETS}/images/favicons/favicon-16x16.png`}
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NectarhubDocument
