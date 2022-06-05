import Head from 'next/head'
import React, { FC } from 'react'
import { DESCRIPTION, STATIC_ASSETS, TITLE } from 'src/constants'

interface Props {
  title?: string
  description?: string
}

const SEO: FC<Props> = ({ title = TITLE, description = DESCRIPTION }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      <link rel="preconnect" href="https://ik.imagekit.io" />
      <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      <link rel="preconnect" href="https://ipfs.infura.io" />
      <link rel="dns-prefetch" href="https://ipfs.infura.io" />

      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href={`${STATIC_ASSETS}/images/icons/apple-touch-icon.png`}
      />
      <link rel="manifest" href="/manifest.json" />

      <link
        rel="search"
        type="application/opensearchdescription+xml"
        href="/opensearch.xml"
        title="OpenReview"
      />
    </Head>
  )
}

export default SEO
