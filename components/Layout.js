import React from 'react'
import Head from 'next/head'
import LocalSearch from './LocalSearch'

export default ({ cityName, children, title = 'Your daily inspiration ♥' }) => (
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
      <LocalSearch cityName={cityName}/>
    </header>

    {children}

    <footer>made with ♥ by mohammed and tali.</footer>
  </div>
)
