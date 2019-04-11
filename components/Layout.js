import React from 'react'
// import Link from 'next/link'
import Head from 'next/head'

const Layout = ({ children, title = 'Your daily inspiration ♥' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet"/>
    </Head>
    <header>
      <div className="brand">
        <span>Halyard</span> booking <span className="brand-period">.</span>
      </div>
      <div>
        <img className="search-input" src="/static/search.svg" alt="search for another location" />
      </div>
    </header>

    {children}

    <footer></footer>
  </div>
)

export default Layout