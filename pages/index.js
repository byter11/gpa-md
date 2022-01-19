import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const toggleTheme = (e) => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme == 'light' ? 'dark' : 'light';
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
        <input/>
      </main>
    </div>
  )
}
