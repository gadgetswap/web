import { NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { Footer, Header } from '../components'

interface Props {
  token: string
}

const Home: NextPage<Props> = ({ token }) => (
  <>
    <Head>
      <title>GadgetSwap</title>
    </Head>

    <Header loggedIn={!!token} />

    <main
      className="justify-center -z-2"
      style={{
        margin: 0
      }}>
      <section className="flex items-center justify-center flex-col my-8 px-8 py-32 relative">
        <h2 className="text-5xl font-semibold ">What is GadgetSwap?</h2>
        <p className="mt-4">
          Ever got greedy and bought too many gadgets you didn&apos;t need?
        </p>
        <p className="mt-4">
          Still want more but don&apos;t know what to do with the ones you have?
        </p>
        <p className="mt-4">Swap gadgets with other people using GadgetSwap!</p>
      </section>
      <section className="flex items-center justify-center flex-col my-8 px-8 py-32 relative">
        <h2 className="text-5xl font-semibold ">How does it work?</h2>
        <p className="mt-4">
          Post your gadget with photos and wait for someone to request it.
        </p>
        <p className="mt-4">
          Or find something you like to and request the owner to swap with you.
        </p>
        <p className="mt-4">If both of you agree, that&apos;s it!</p>
      </section>
    </main>

    <Footer />

    <style jsx>{`
      section:before {
        background: #fc0;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      section:nth-child(odd):before {
        clip-path: polygon(0 5em, 100% 0, 100% calc(100% - 5em), 0 100%);
      }

      section:nth-child(even):before {
        clip-path: polygon(0 0, 100% 5em, 100% 100%, 0 calc(100% - 5em));
      }
    `}</style>
  </>
)

Home.getInitialProps = async context => {
  const { token } = parseCookies(context)

  return {
    token
  }
}

export default Home
