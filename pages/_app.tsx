import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(()=>{
    const initialTheme: string = 
      localStorage.getItem('theme') || window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
