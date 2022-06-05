import { gql, useQuery } from '@apollo/client'
import { GridItemSix, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import SEO from '@components/utils/SEO'
import { CommunityFields } from '@gql/CommunityFields'
import consoleLog from '@lib/consoleLog'
import { NextPage } from 'next'
import React from 'react'
import Custom500 from 'src/pages/500'

import NewList from './NewList'

const COMMUNITY_QUERY = gql`
  query (
    $topCommented: ExplorePublicationRequest!
    $topCollected: ExplorePublicationRequest!
  ) {
    topCommented: explorePublications(request: $topCommented) {
      items {
        ... on Post {
          ...CommunityFields
        }
      }
    }
    topCollected: explorePublications(request: $topCollected) {
      items {
        ... on Post {
          ...CommunityFields
        }
      }
    }
  }
  ${CommunityFields}
`

const Communities: NextPage = () => {
  const { data, loading, error } = useQuery(COMMUNITY_QUERY, {
    variables: {
      topCommented: {
        sortCriteria: 'TOP_COMMENTED',
        publicationTypes: ['POST'],
        limit: 8
      },
      topCollected: {
        sortCriteria: 'TOP_COLLECTED',
        publicationTypes: ['POST'],
        limit: 8
      }
    },
    onCompleted() {
      consoleLog(
        'Query',
        '#ffa500',
        `Fetched 10 TOP_COMMENTED and TOP_COLLECTED communities`
      )
    }
  })

  const presetHottestCommunities = [
    {
      id: '0x023b-0x16?ref=https://celo.org/&title=Celo:%20Mobile-First%20DeFi%20Platform%20for%20Fast,%20Secure,%20and%20Stable%20Digital%20Payments&cover=https://images.ctfassets.net/bzlah72jow8z/Qgsyz88twj3sea9lXo9Yt/d629fc2774f3b0d27bd866cc038cd625/HomeOpenGraphImage.jpg',
      metadata: {
        name: 'CELO',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Celo-v2.svg'
          }
        },
        description:
          'Celo: Mobile-First DeFi Platform for Fast, Secure, and Stable Digital Payments'
      }
    },
    {
      id: '0x023b-0x16?ref=https://polygon.technology/&title=Bring%20the%20World%20to%20Ethereum%20|%20Polygon%20-%20Polygon&cover=https://res.cloudinary.com/polygontech/image/upload/f_auto,q_auto,dpr_2,w_600/Homepage_OG_ba1bb79108',
      metadata: {
        name: 'Polygon',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Polygon-v2.svg'
          }
        },
        description: 'Bring the World to Ethereum | Polygon - Polygon'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.coinbase.com/&title=Coinbase%20-%20Buy%20and%20Sell%20Bitcoin,%20Ethereum,%20and%20more%20with%20trust&cover=https://www.coinbase.com/img/og-default-04-2021.jpg',
      metadata: {
        name: 'Coinbase',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Coinbase.svg'
          }
        },
        description:
          'Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust'
      }
    },
    {
      id: '0x023b-0x16?ref=https://near.org/&title=NEAR%20Protocol%20|%20Reimagine%20Your%20World&cover=https://near.org/wp-content/uploads/2021/10/CITY_COMPLETE_10.jpg',
      metadata: {
        name: 'NEAR Protocol',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/NEAR-v2.svg'
          }
        },
        description: 'NEAR Protocol | Reimagine Your World'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.figment.io/&title=Figment%20-%20Building%20Web%203&cover=https://assets-global.website-files.com/61112eff0f3a419ae57a77d8/614c4845aa8a272bbb6b4818_figment%20OG.jpeg',
      metadata: {
        name: 'Figment',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Figment-v2.svg'
          }
        },
        description: 'Figment - Building Web 3'
      }
    },
    {
      id: '0x023b-0x16?ref=https://edgeandnode.com/&title=Edge%20&%20Node&cover=https://storage.googleapis.com/edge-and-node/Edge-Node-SEO2.jpg',
      metadata: {
        name: 'Edge & Node',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/EdgeAndNode-v2.svg'
          }
        },
        description: 'Building the Decentralized Future'
      }
    },
    {
      id: '0x023b-0x16?ref=https://decentraland.org/&title=Welcome%20to%20Decentraland&cover=https://decentraland.org/static/scenes4-8b249f635fd135f449ea526930d984ce.jpg',
      metadata: {
        name: 'Decentraland',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Decentraland.svg'
          }
        },
        description: 'Welcome to Decentraland'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.bnbchain.org/en&title=Explore%20the%20BNB%20Smart%20Chain%20Ecosystem%20and%20Binance%20DEX.%20Fast,%20decentralized,%20affordable%20and%20secure.&cover=https://dex-bin.bnbstatic.com/static/images/dex_twitter.png',
      metadata: {
        name: 'BNB Chain',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/BNBChain.svg'
          }
        },
        description:
          'Explore the BNB Smart Chain Ecosystem and Binance DEX. Fast, decentralized, affordable and secure.'
      }
    },
    {
      id: '0x023b-0x16?ref=https://boba.network/&title=Boba%20|%20Layer%202%20Ethereum%20scaling%20and%20augmenting%20solution&cover=https://boba.network/wp-content/uploads/2021/08/Boba-Social-Image.png',
      metadata: {
        name: 'Boba Network',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Boba.svg'
          }
        },
        description: 'Boba | Layer 2 Ethereum scaling and augmenting solution'
      }
    },
    {
      id: '0x023b-0x16?ref=https://filecoin.io/&title=A%20decentralized%20storage%20network%20for%20humanity%27s%20most%20important%20information%20|%20Filecoin&cover=https://filecoin.io/uploads/filecoin-server-rack-share.jpg?c=1654288540',
      metadata: {
        name: 'Filecoin',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Filecoin-v2.svg'
          }
        },
        description: 'Filecoin Hackathons!'
      }
    },
    {
      id: '0x023b-0x16?ref=https://multicoin.capital/&title=Multicoin%20Capital&cover=images.ctfassets.net/qtbqvna1l0yq/6juqeLUSk9eIQDz72BG6HA/16b826b1d5a3defc5d54468f1b0ebc1c/New_Social_Preview_Tile.png',
      metadata: {
        name: 'Multicoin Capital',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Multicoin.svg'
          }
        },
        description:
          'We are a thesis-driven investment firm that invests in cryptocurrencies, tokens, and blockchain companies.'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.nomad.xyz/&title=Nomad',
      metadata: {
        name: 'Nomad',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Nomad.svg'
          }
        },
        description: 'THE FUTURE OF CROSS-CHAIN IS OPTIMISTIC'
      }
    }
  ]

  const presetFastestCommunities = [
    {
      id: '0x023b-0x16?ref=https://edgeandnode.com/&title=Edge%20&%20Node&cover=https://storage.googleapis.com/edge-and-node/Edge-Node-SEO2.jpg',
      metadata: {
        name: 'Edge & Node',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/EdgeAndNode-v2.svg'
          }
        },
        description: 'Building the Decentralized Future'
      }
    },
    {
      id: '0x023b-0x16?ref=https://decentraland.org/&title=Welcome%20to%20Decentraland&cover=https://decentraland.org/static/scenes4-8b249f635fd135f449ea526930d984ce.jpg',
      metadata: {
        name: 'Decentraland',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Decentraland.svg'
          }
        },
        description: 'Welcome to Decentraland'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.bnbchain.org/en&title=Explore%20the%20BNB%20Smart%20Chain%20Ecosystem%20and%20Binance%20DEX.%20Fast,%20decentralized,%20affordable%20and%20secure.&cover=https://dex-bin.bnbstatic.com/static/images/dex_twitter.png',
      metadata: {
        name: 'BNB Chain',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/BNBChain.svg'
          }
        },
        description:
          'Explore the BNB Smart Chain Ecosystem and Binance DEX. Fast, decentralized, affordable and secure.'
      }
    },
    {
      id: '0x023b-0x16?ref=https://boba.network/&title=Boba%20|%20Layer%202%20Ethereum%20scaling%20and%20augmenting%20solution&cover=https://boba.network/wp-content/uploads/2021/08/Boba-Social-Image.png',
      metadata: {
        name: 'Boba Network',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Boba.svg'
          }
        },
        description: 'Boba | Layer 2 Ethereum scaling and augmenting solution'
      }
    },
    {
      id: '0x023b-0x16?ref=https://filecoin.io/&title=A%20decentralized%20storage%20network%20for%20humanity%27s%20most%20important%20information%20|%20Filecoin&cover=https://filecoin.io/uploads/filecoin-server-rack-share.jpg?c=1654288540',
      metadata: {
        name: 'Filecoin',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Filecoin-v2.svg'
          }
        },
        description: 'Filecoin Hackathons!'
      }
    },
    {
      id: '0x023b-0x16?ref=https://multicoin.capital/&title=Multicoin%20Capital&cover=images.ctfassets.net/qtbqvna1l0yq/6juqeLUSk9eIQDz72BG6HA/16b826b1d5a3defc5d54468f1b0ebc1c/New_Social_Preview_Tile.png',
      metadata: {
        name: 'Multicoin Capital',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Multicoin.svg'
          }
        },
        description:
          'We are a thesis-driven investment firm that invests in cryptocurrencies, tokens, and blockchain companies.'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.nomad.xyz/&title=Nomad',
      metadata: {
        name: 'Nomad',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Nomad.svg'
          }
        },
        description: 'THE FUTURE OF CROSS-CHAIN IS OPTIMISTIC'
      }
    },
    {
      id: '0x023b-0x16?ref=https://celo.org/&title=Celo:%20Mobile-First%20DeFi%20Platform%20for%20Fast,%20Secure,%20and%20Stable%20Digital%20Payments&cover=https://images.ctfassets.net/bzlah72jow8z/Qgsyz88twj3sea9lXo9Yt/d629fc2774f3b0d27bd866cc038cd625/HomeOpenGraphImage.jpg',
      metadata: {
        name: 'CELO',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Celo-v2.svg'
          }
        },
        description:
          'Celo: Mobile-First DeFi Platform for Fast, Secure, and Stable Digital Payments'
      }
    },
    {
      id: '0x023b-0x16?ref=https://polygon.technology/&title=Bring%20the%20World%20to%20Ethereum%20|%20Polygon%20-%20Polygon&cover=https://res.cloudinary.com/polygontech/image/upload/f_auto,q_auto,dpr_2,w_600/Homepage_OG_ba1bb79108',
      metadata: {
        name: 'Polygon',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Polygon-v2.svg'
          }
        },
        description: 'Bring the World to Ethereum | Polygon - Polygon'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.coinbase.com/&title=Coinbase%20-%20Buy%20and%20Sell%20Bitcoin,%20Ethereum,%20and%20more%20with%20trust&cover=https://www.coinbase.com/img/og-default-04-2021.jpg',
      metadata: {
        name: 'Coinbase',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Coinbase.svg'
          }
        },
        description:
          'Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust'
      }
    },
    {
      id: '0x023b-0x16?ref=https://near.org/&title=NEAR%20Protocol%20|%20Reimagine%20Your%20World&cover=https://near.org/wp-content/uploads/2021/10/CITY_COMPLETE_10.jpg',
      metadata: {
        name: 'NEAR Protocol',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/NEAR-v2.svg'
          }
        },
        description: 'NEAR Protocol | Reimagine Your World'
      }
    },
    {
      id: '0x023b-0x16?ref=https://www.figment.io/&title=Figment%20-%20Building%20Web%203&cover=https://assets-global.website-files.com/61112eff0f3a419ae57a77d8/614c4845aa8a272bbb6b4818_figment%20OG.jpeg',
      metadata: {
        name: 'Figment',
        cover: {
          original: {
            url: 'https://thegraph.com/images/graph-hack/sponsors/Figment-v2.svg'
          }
        },
        description: 'Figment - Building Web 3'
      }
    }
  ]

  if (error) return <Custom500 />
  if (loading || !data) return <PageLoading message="Loading projects" />

  return (
    <GridLayout>
      <SEO title="OneReview Projects" />
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-orange-500">
          {/* <FireIcon className="w-5 h-5 text-red-500" /> */}
          <div>Most Reviewed</div>
        </div>
        <NewList communities={presetHottestCommunities} />
      </GridItemSix>
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-green-500">
          {/* <ChartBarIcon className="w-5 h-5 text-green-500" /> */}
          <div>Gaining Traction</div>
        </div>
        <NewList communities={presetFastestCommunities} />
      </GridItemSix>
    </GridLayout>
  )
}

export default Communities
