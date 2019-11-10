import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

class Doc extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    const styles = sheet.getStyleElement()

    return {
      ...page,
      styles
    }
  }

  render() {
    const { styles } = this.props

    return (
      <html>
        <Head>{styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Doc
