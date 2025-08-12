// TitleBar.tsx
import React from 'react'
import '../mystyles/cardstyle.css'
import { useNavigate } from 'react-router-dom'
import { Card, FloatButton } from 'antd'
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons'

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  height: '100px'
}

const Mcard: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Card hoverable variant="borderless" className="mcard-style " title="menu">
      <Card.Grid
        style={gridStyle}
        onClick={(e) => {
          e.stopPropagation()
          navigate('/')
        }}
      >
        计算器
      </Card.Grid>
      <Card.Grid
        style={gridStyle}
        onClick={(e) => {
          e.stopPropagation()
          navigate('/Drawing')
        }}
      >
        绘图器
      </Card.Grid>
      <Card.Grid
        style={gridStyle}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        content
      </Card.Grid>
      <Card.Grid
        style={gridStyle}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        content
      </Card.Grid>
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
