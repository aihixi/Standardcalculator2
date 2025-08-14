// TitleBar.tsx
import React from 'react'
import '../mystyles/cardstyle.css'
import { useNavigate } from 'react-router-dom'
import { Card, FloatButton } from 'antd'
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons'

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'center',
  height: '100px'
}

const Mcard: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Card
      style={{ backgroundColor: '#E8ECEF' }}
      hoverable
      variant="borderless"
      className="mcard-style "
      title={
        <span style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>MENU</span>
      }
    >
      <Card.Grid
        style={gridStyle}
        onClick={(e) => {
          e.stopPropagation()
          navigate('/')
        }}
      >
        <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#2D5789' }}>Calculator</span>
      </Card.Grid>
      <Card.Grid
        style={gridStyle}
        onClick={(e) => {
          e.stopPropagation()
          navigate('/Drawing')
        }}
      >
        <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#2D5789' }}>Drawer</span>
      </Card.Grid>
      {/* <Card.Grid
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
      </Card.Grid> */}
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
