import { gql } from '@apollo/client'

export const StatsFields = gql`
  fragment StatsFields on PublicationStats {
    totalAmountOfCollects
    totalAmountOfComments
  }
`
