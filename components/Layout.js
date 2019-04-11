import React from 'react'
import Head from 'next/head'

const Layout = ({ cityName, children, title = 'Your daily inspiration ♥' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet"/>
    </Head>
    <header>
      <div className="brand">
        <span className="brand-name">Halyard</span> booking <span className="brand-period">.</span>
      </div>
      <div className="search-input-container">
        <img src="/static/search.svg" alt="search for another location" />
        <input placeholder={cityName}/>
      </div>
    </header>

    {children}

    <footer></footer>
  </div>
)

export default Layout