// src/views/Home.tsx (确保此文件存在并包含以下内容)
import '../mystyles/drawingstyle.css'
import React, { useState, useEffect, useRef } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Mcard, Mbutton } from '../components/Menu'
import { Card, message } from 'antd'
import Plotly from 'plotly.js-basic-dist'

const Drawing: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [outflipped, setOutFlipped] = useState(false)

  const f_success = (e): void => {
    e.stopPropagation()
    const textToCopy = 'Drawing'
    if (!textToCopy) {
      return
    }
    navigator.clipboard.writeText(textToCopy)
    messageApi.open({
      type: 'success',
      content: '复制成功'
    })
  }

  const plotRef = useRef(null)

  useEffect(() => {
    if (plotRef.current) {
      const data = [
        {
          x: Array.from({ length: 200 }, (_, i) => i * 0.1 - 10), // -10到10的范围
          y: Array.from({ length: 200 }, (_, i) => Math.sin(i * 0.1 - 10)),
          mode: 'lines',
          name: 'sin(x)',
          line: { color: '#31577E' }
        }
      ]

      const layout = {
        title: 'sin(x) 绘图',
        xaxis: {
          title: 'x轴',
          tickmode: 'auto',
          nticks: 20,
          ticklabelposition: 'inside'
        },
        yaxis: {
          title: 'y轴',
          tickmode: 'auto',
          nticks: 20,
          ticklabelposition: 'inside'
        }
      }

      const config = {
        displaylogo: false, // 隐藏Plotly logo
        modeBarButtonsToRemove: ['toImage']
      }

      Plotly.newPlot(plotRef.current, data, layout, config)
    }
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ height: '20px' }} />
        <Mbutton outflipped={outflipped} setOutFlipped={setOutFlipped} />
        {contextHolder}
        <ReactCardFlip isFlipped={outflipped} flipDirection="horizontal">
          <Card
            key={'nomal'}
            hoverable
            variant="borderless"
            className="card-style"
            onClick={() => {
              setOutFlipped(true)
            }}
          >
            <span onClick={f_success}>DrawingPage</span>
          </Card>
          <span
            key={'menu'}
            onClick={() => {
              setOutFlipped(false)
            }}
          >
            <Mcard />
          </span>
        </ReactCardFlip>
      </div>
      <main className="content">
        <div ref={plotRef} className="plot-container" />
      </main>
    </div>
  )
}

export default Drawing
