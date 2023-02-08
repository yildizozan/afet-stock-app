import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/navbar'
import app from '../configs/firestoreConfig'

export default class MyDocument extends NextDocument {
  static getInitialProps(ctx) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="robots" content="follow, index" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        </Head>

        <body>
          <Navbar />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
