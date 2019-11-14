import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

class Doc extends Document {
  render() {
    return (
      <html>
        <Head />
        <body className="font-sans cursor-default outline-none container mx-auto w-full">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Doc
