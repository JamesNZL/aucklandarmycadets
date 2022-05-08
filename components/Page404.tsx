import * as React from 'react'

import * as types from 'lib/types'
import * as config from 'lib/config';

import { PageHead } from './PageHead'

import styles from './styles.module.css'

export const Page404: React.FC<types.PageProps> = ({ site }) => {
  const title = site?.name || `Page Not Found | ${config.name}`

  return (
    <>
      <PageHead site={site} title={title} />

      <a className={styles.container} href='/'>
        <main className={styles.main}>
          <h1>I can&apos;t seem to find that page.</h1>
          <h2>Click anywhere to go home.</h2>
        </main>
      </a>
    </>
  )
}
