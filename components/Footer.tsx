import * as React from 'react'

import * as config from 'lib/config'

import styles from './styles.module.css'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export const FooterImpl: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>Copyright 2022 {config.author}</div>

      <script async src='https://www.googletagmanager.com/gtag/js?id=UA-228761608-1' />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-228761608-1');
gtag('config', 'G-C29PHRKML7');
`
        }}
      />
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
