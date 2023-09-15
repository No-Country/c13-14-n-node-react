import styles from './previewer.module.css'

export default function ShareMenu ({ nameSpace, setShowShare }) {
  const profileUrl = `http://${nameSpace}.localhost:5173`

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl)
    setShowShare(false)
  }

  return (
    <div className={styles.shareMenu}>
      <h5>Conparte tu link</h5>
      <div className={styles.menuContainer}>
        <button
          className={styles.btnCopy}
          onClick={handleCopy}
        >
          copiar
        </button>
        <a
          href={profileUrl}
          target='_blank' rel="noreferrer"
          onClick={() => setShowShare(false)}
        >
          {nameSpace}
        </a>
      </div>
    </div>
  )
}
