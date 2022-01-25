import styles from './input.module.css';
import { useEffect, useRef, useState, MouseEvent } from 'react';

export default function ApiLink(props: { sgpa: number[], cgpa: number[], labels: string[] }) {
  const [copied, setCopied] = useState<NodeJS.Timeout>(null);

  const apiLink = typeof window !== 'undefined'
    ? encodeURI(
      window.location.host + '/api/'
      + '?sgpa=' + props.sgpa.join()
      + '&cgpa=' + props.cgpa.join()
      + '&labels=' + props.labels.join()
    )
    : '';

  function copyLink(e: MouseEvent): void {
    if (!navigator.clipboard)
      return;

    navigator.clipboard.writeText(apiLink);
    setCopied(copied => {
      if (copied) {
        clearTimeout(copied)
        return null
      }
      return setTimeout(() => setCopied(null), 2000);
    });
}
return <div className={styles.apiLink}>
  <input
    readOnly
    value={apiLink}
  />
  <button
    style={copied ? { backgroundColor: 'lime' } : {}}
    onClick={copyLink}>{copied ? 'Copied' : 'Copy'}</button>
</div>

}
