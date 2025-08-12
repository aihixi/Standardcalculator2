// TitleBar.tsx
import React from 'react'
import '../mystyles/cardstyle.css'
import { Card, FloatButton } from 'antd'
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons'

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  height: '100px'
}

const Mcard: React.FC = () => {
  return (
    <Card hoverable variant="borderless" className="mcard-style " title="menu">
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  )
}

const Mbutton: React.FC<{ outflipped: boolean; setOutFlipped: (value) => void }> = ({
  outflipped,
  setOutFlipped
}) => {
  return (
    <FloatButton
      icon={outflipped ? <CloseOutlined /> : <UnorderedListOutlined />}
      onClick={() => setOutFlipped((prev) => !prev)}
      style={{ right: 10, top: 50 }}
    />
  )
}

export { Mcard, Mbutton }
