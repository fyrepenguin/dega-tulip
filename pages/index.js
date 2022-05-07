import React from 'react';
import { client } from 'store/client';
import gql from 'graphql-tag';
import Homepage from 'components/Homepage';
import Head from 'next/head';

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>{data.space.site_title} </title>
      </Head>
      <Homepage data={data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
      query Homepage {
        posts: posts(formats: { slugs: ["article"] }) {
          total
          nodes {
            users {
              id
              first_name
              last_name
              display_name
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            published_date
            id
            status
            subtitle
            title
            slug
            excerpt
          }
        }
        factchecks: posts(formats: { slugs: ["fact-check"] }) {
          total
          nodes {
            users {
              id
              first_name
              last_name
              display_name
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            published_date
            id
            status
            subtitle
            title
            slug
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
