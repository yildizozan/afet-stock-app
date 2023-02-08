import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/header'

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
          <Header />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
