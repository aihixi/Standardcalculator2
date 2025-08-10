// TitleBar.tsx
import React from 'react'
import '../mystyles/titlestyle.css'

const TitleBar: React.FC = () => {
  const minimize = (): void => window.api?.minimize()
  const close = (): void => window.api?.close()

  return (
    <div id="title-bar">
      <div id="title"> Standard Calculator </div>
      <div id="buttons">
        <div className="button" onClick={minimize}>
          —
        </div>
        <div className="button" onClick={close}>
          ✕
        </div>
      </div>
    </div>
  )
}

export default TitleBar
