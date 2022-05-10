import * as React from 'react'
import { PageHead } from './PageHead'

import * as config from 'lib/config';

import styles from './styles.module.css'

export const ErrorPage: React.FC<{ statusCode: number }> = ({ statusCode }) => {
  const title = `Error | ${config.name}`

  return (
    <>
      <PageHead title={title} />

      <a className={styles.container} href='/'>
        <main className={styles.main}>
          <h1>There was an error loading this page.</h1>
          {statusCode && <p>Error code: {statusCode}</p>}
          <h2>Click anywhere to return home.</h2>
        </main>
      </a>
    </>
  )
}
