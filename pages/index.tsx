import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../assets/styles'
import { Footer, Header } from '../components'
import { withAuth } from '../lib'
import { User } from '../types/graphql'

const Main = styled.main`
  align-items: center;
  display: flex;
  margin: 0 !important;
`

const Sections = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: -2;

  article {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2em 0;
    padding: 5em;
    position: relative;

    &:before {
      background: ${colors.accent};
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }

    &:nth-child(odd) {
      &:before {
        clip-path: polygon(0 5vh, 100% 0, 100% calc(100% - 5vh), 0 100%);
      }
    }

    &:nth-child(even) {
      &:before {
        clip-path: polygon(0 0, 100% 5vh, 100% 100%, 0 calc(100% - 5vh));
      }
    }

    &:not(:first-child) {
      /* margin-left: 2em; */
    }

    h2 {
      line-height: 1.2;
      margin: 1rem 0;
    }

    p {
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }
  }
`

interface Props {
  user: User
}

const Home: NextPage<Props> = ({ user }) => (
  <>
    <Head>
      <title>GadgetSwap</title>
    </Head>

    <Header user={user} />

    <Main>
      <Sections>
        <article>
          <h2>What is GadgetSwap?</h2>
          <p>
            Ever got greedy and bought too many gadgets you didn&apos;t need?
          </p>
          <p>
            Still want more but don&apos;t know what to do with the ones you
            have?
          </p>
          <p>Swap gadgets with other people using GadgetSwap!</p>
        </article>
        <article>
          <h2>How does it work?</h2>
          <p>
            Post your gadget with photos and wait for someone to request it.
          </p>
          <p>
            Or find something you like to and request the owner to swap with
            you.
          </p>
          <p>If both of you agree, that&apos;s it!</p>
        </article>
      </Sections>
    </Main>

    <Footer />
  </>
)

Home.getInitialProps = async context => {
  // @ts-ignore
  const user = await withAuth(context.apolloClient)

  return {
    user
  }
}

export default Home
