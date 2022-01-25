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
    localStorage.setItem('theme', newTheme);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chart Generator</title>
        <meta name="description" content="Generate graph" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.themeToggler} role="" onClick={toggleTheme}>☼</span>
        <Container/>
      </main>
      <footer>
        <small className="text-muted mb-2">
          {'</> with <3 by'} <strong><a href="https://github.com/byter11">mohsin</a></strong>
  </small>
      </footer>
    </div>

  )
}
