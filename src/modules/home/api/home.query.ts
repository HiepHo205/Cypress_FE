import gql from "graphql-tag";

export const GET_HOMEPAGE = gql`
  query GetHomepage {
    homepage {
      banner {
        image {
          url
          public_id
        }

        title
        description

        primary_button_text
        primary_button_url

        secondary_button_text
        secondary_button_url
      }

      businessGrowth {
        label
        title
        description

        packages {
          number
          title
          packageName
          headline
          description
          color
          active
        }
      }

      introduction {
        image {
          url
          public_id
        }

        title
        description

        author
        position

        showQuoteIcon
        showAuthor
      }

      whyChooseCypress {
        badge
        title
        description

        benefits {
          id

          icon {
            url
            public_id
          }

          title
          description
          active
        }
      }

      caseStudies {
        caseStudies {
          id

          label
          title
          subtitle
          summary
          company

          planTitle
          seriesTags

          learnMoreText
          learnMoreUrl

          active

          logo {
            url
            public_id
          }

          image {
            url
            public_id
          }
        }
      }

      pricing {
        title
        description

        button_text
        button_link
      }

      successStories {
        successStories {
          id

          name
          categories
          role
          company
          quote

          avatar {
            url
            public_id
          }
        }
      }

      generalInformation {
        generalInformations {
          id

          badge
          title
          description
        }
      }

      news {
        label
        title

        news {
          id
          category
          date
          title
          description
          active

          image {
            url
            public_id
          }
        }
      }

      sideNews {
        sideNews {
          id
          description

          image {
            url
            public_id
          }
        }
      }

      launchOffer {
        title
        subtitle
        buttonText
        buttonUrl
        expiryDate
        seats
      }

      newsSections {
        sections {
          id
          key
          title

          buttonText
          buttonUrl

          items {
            id
            title
          }
        }
      }

      contact {
        id

        title
        description

        image {
          url
          public_id
        }

        termsText
        termsLabel
        termsUrl

        buttonText
        buttonUrl

        labels {
          id
          title
          placeholder
          type

          options {
            id
            value
          }
        }
      }
    }
  }
`;
