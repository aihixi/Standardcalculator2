// src/views/Drawing.tsx
import '../mystyles/drawingstyle.css'
import React, { useState, useEffect, useRef } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Mcard, Mbutton } from '../components/Menu'
import { Card, Button, message, Drawer, Carousel, Row, Col } from 'antd'
import functionPlot from 'function-plot'

const Drawing: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [outflipped, setOutFlipped] = useState(false)

  const [open, setOpen] = useState(false)

  const [exprArr, setExprArr] = useState<string[]>([])
  const [showExpressions, setShowExpressions] = useState<string[]>([])

  const f_success = (e): void => {
    e.stopPropagation()
    const textToCopy = showExpressions.join('')
    if (!textToCopy) {
      return
    }
    navigator.clipboard.writeText(textToCopy)
    messageApi.open({
      type: 'success',
      content: '复制成功'
    })
  }

  const showDrawer = (): void => {
    setOpen(true)
  }

  const onClose = (): void => {
    setOpen(false)
  }

  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderPlot = (): void => {
      if (plotRef.current) {
        try {
          // 清空容器内容
          plotRef.current.innerHTML = ''

          // 使用 function-plot 绘图
          functionPlot({
            target: plotRef.current,
            width: 500,
            height: 700,
            grid: true,
            data: [
              {
                fn: exprArr.join(''),
                color: '#31577E'
              }
            ]
          })
        } catch (error) {
          console.error('绘图出错:', error)
        }
      }
    }

    // 只有在抽屉打开时才渲染图表 ***
    if (open) {
      // 在组件挂载后延迟渲染图表，确保 DOM 元素已完全加载
      const timer = setTimeout(renderPlot, 100)
      return () => clearTimeout(timer)
    } else {
      // 当抽屉关闭时清理图表
      if (plotRef.current) {
        plotRef.current.innerHTML = ''
      }
      return undefined
    }
  }, [open, exprArr])

  //函数编辑
  const str = '\u3000' // 字[全角空格]字

  const onClick = (num: string): void => {
    if (num === 'e' && exprArr[exprArr.length - 1] === 'log') {
      setShowExpressions((prev) => [...prev, num])
      return // 避免连续输入 'log' 后跟 'e'
    }
    setExprArr((prev) => [...prev, num])
    if (num === 'pi') {
      setShowExpressions((prev) => [...prev, 'π'])
    } else if (num === 'sqrt') {
      setShowExpressions((prev) => [...prev, '√'])
    } else if (num === '^2') {
      setShowExpressions((prev) => [...prev, '²'])
    } else if (num === '^(-1)') {
      setShowExpressions((prev) => [...prev, '⁻¹'])
    } else if (num === '*0.01') {
      setShowExpressions((prev) => [...prev, '%'])
    } else if (num === '*') {
      setShowExpressions((prev) => [...prev, '×'])
    } else if (num === '/') {
      setShowExpressions((prev) => [...prev, '÷'])
    } else if (num === 'log10(') {
      setShowExpressions((prev) => [...prev, 'lg('])
    } else if (num === 'log(') {
      setShowExpressions((prev) => [...prev, 'ln('])
    } else {
      setShowExpressions((prev) => [...prev, num])
    }
  }

  const onClick_ac = (): void => {
    // TODO: 实现清空逻辑
    setShowExpressions([])
    setExprArr([])
  }

  const onClick_de = (): void => {
    // TODO: 实现删除逻辑
    if (
      exprArr[exprArr.length - 1] === 'log' &&
      showExpressions[showExpressions.length - 1] === 'e'
    ) {
      setShowExpressions((prev) => prev.slice(0, -1))
      return // 避免连续输入 'log' 后跟 'e'
    }
    setExprArr((prev) => prev.slice(0, -1))
    setShowExpressions((prev) => prev.slice(0, -1))
  }

  const c_contentStyle: React.CSSProperties = {
    width: 350,
    height: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20px',
    borderRadius: '25px'
  }

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
            <span onClick={f_success}>{showExpressions.join('')}</span>
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
        <div className="draw-button-top-grid">
          <Button className="button-style" type="primary" onClick={() => onClick_ac()}>
            AC
          </Button>
          <Button className="button-style" type="primary" onClick={() => onClick_de()}>
            DEL
          </Button>
          <Button className="button-style" type="primary" onClick={() => onClick('+')}>
            +
          </Button>
          <Button className="button-style" type="primary" onClick={() => onClick('-')}>
            -
          </Button>
        </div>
        <Row justify="space-between">
          <Col span={18} style={{ height: '200px' }}>
            {str}
            <Carousel
              arrows
              dots={false}
              dotPosition="left"
              infinite={false}
              style={{ width: '420px', height: '450px' }}
            >
              <div>
                <Card hoverable variant="borderless" style={c_contentStyle}>
                  <div className="button-grid">
                    <Button className="l-button-style" type="primary" onClick={() => onClick('7')}>
                      7
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('8')}>
                      8
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('9')}>
                      9
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('4')}>
                      4
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('5')}>
                      5
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('6')}>
                      6
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('1')}>
                      1
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('2')}>
                      2
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('3')}>
                      3
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('pi')}>
                      π
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('0')}>
                      0
                    </Button>
                    <Button className="l-button-style" type="primary" onClick={() => onClick('e')}>
                      e
                    </Button>
                  </div>
                </Card>
                {str}
              </div>
              <div>
                <Card hoverable variant="borderless" style={c_contentStyle}>
                  <div className="button-grid">
                    <Button className="button-style" type="primary" onClick={() => onClick('sin(')}>
                      sin
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('cos(')}>
                      cos
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('tan(')}>
                      tan
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('log')}>
                      log
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('(')}>
                      (
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick(')')}>
                      )
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('^')}>
                      ^
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('x')}>
                      X
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('y')}>
                      Y
                    </Button>
                  </div>
                </Card>
                {str}
              </div>
            </Carousel>
          </Col>
          <Col span={6} style={{ height: '200px' }}>
            {str}
            <div style={{ marginLeft: '-10px' }} className="button-left-grid">
              <Button className="button-style" type="primary" onClick={() => onClick('*')}>
                ×
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('/')}>
                ÷
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('.')}>
                .
              </Button>
              <Button className="e-button-style" type="primary" onClick={showDrawer}>
                =
              </Button>
            </div>
          </Col>
        </Row>
        {/* <div ref={plotRef} /> */}
        <Drawer
          title={exprArr.join('')}
          placement="bottom"
          height="95%"
          closable={{ 'aria-label': 'Close Button' }}
          onClose={onClose}
          open={open}
          getContainer={false}
        >
          <div ref={plotRef} />
        </Drawer>
      </main>
    </div>
  )
}

export default Drawing
