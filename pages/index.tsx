import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/input/container';
import { MouseEvent } from 'react';

export default function Home() {

  function toggleTheme() {
    const theme: string = document.documentElement.getAttribute('data-theme');
    const newTheme: string = theme == 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chart Generator</title>
        <meta name="description" content="Generate graph" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.themeToggler} role="" onClick={toggleTheme}>☼</span>
        <Container/>
      </main>
    </div>
  )
}
