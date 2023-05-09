import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:description" content="Ganjana Store" key="description" />
        <meta property="og:image" content="/ganjana_meta.jpg" />
        <meta property="og:url" content="https://ganjana.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ganjana.org" />
        <meta name="twitter:description" content="Ganjana Store" />
        <meta name="twitter:image" content="https://www.datocms-assets.com/95279/1682709905-hero-img.jpg" />
        <meta name="description" content="Ganjana Store" />
        <link rel=" shortcut icon" href="https://www.datocms-assets.com/95279/1678549877-ganjana_logo_only.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
