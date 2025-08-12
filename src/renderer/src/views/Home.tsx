// src/views/Home.tsx (确保此文件存在并包含以下内容)
import '../mystyles/homestyle.css'
import React, { useState } from 'react'
import { evaluate } from 'mathjs'
import ReactCardFlip from 'react-card-flip'
import { Mcard, Mbutton } from '../components/Menu'
import { Button, Card, Carousel, Row, Col, message } from 'antd'

const Home: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    width: 480,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto', // 让卡片在轮播项中居中
    borderRadius: '25px'
  }

  const c_contentStyle: React.CSSProperties = {
    width: 120,
    height: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto', // 让卡片在轮播项中居中
    borderRadius: '25px'
  }

  const str = '\u3000' // 字[全角空格]字

  const [exprArr, setExprArr] = useState<string[]>([])
  const [showExpressions, setShowExpressions] = useState<string[]>([])
  const [result, setResult] = useState<string>('')
  const EPSILON = 1e-12 // 误差阈值

  const [messageApi, contextHolder] = message.useMessage()

  const [flipped, setFlipped] = useState(false)
  const [outflipped, setOutFlipped] = useState(false)

  const [poem, setPoem] = useState('加载中...')
  const [from, setFrom] = useState('')

  const f_success = (e): void => {
    e.stopPropagation()
    const textToCopy = showExpressions.join('') || result
    if (!textToCopy) {
      return
    }
    navigator.clipboard.writeText(textToCopy)
    messageApi.open({
      type: 'success',
      content: '复制成功'
    })
  }

  const b_success = (e): void => {
    e.stopPropagation()
    const textToCopy = `${poem}\n${from}`
    navigator.clipboard.writeText(textToCopy)
    messageApi.open({
      type: 'success',
      content: '复制成功'
    })
  }

  const onClick = (num: string): void => {
    setResult('') // 清空结果
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
    console.log(showExpressions)
  }

  const onClick_ac = (): void => {
    // TODO: 实现清空逻辑
    setShowExpressions([])
    setExprArr([])
    setResult('')
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

  const sanitizeResult = (value: number): number => {
    const intPart = Math.round(value)
    const decimalPart = Math.abs(value - intPart)
    if (decimalPart < EPSILON) {
      return intPart // 小数部分接近0，返回整数部分
    }
    return value // 否则返回原值
  }

  const evaluating = (): number => {
    // TODO: 实现计算逻辑
    try {
      const rawResult = evaluate(exprArr.join(''))
      const numresult = sanitizeResult(rawResult)
      console.log(numresult)
      setExprArr([])
      setShowExpressions([])
      setResult(numresult.toString())
      return numresult
    } catch {
      setExprArr([])
      setShowExpressions([])
      setResult('错误')
      return NaN
    }
  }

  async function getPoem(): Promise<void> {
    try {
      const res = await fetch('https://v1.jinrishici.com/all.json')
      const data = await res.json()
      setPoem(data.content)
      setFrom(`—— ${data.author}《${data.origin}》`)
    } catch {
      setPoem('加载失败，请稍后重试')
      setFrom('')
    }
    console.log(poem)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ height: '20px' }} />
        <Mbutton outflipped={outflipped} setOutFlipped={setOutFlipped} />
        {contextHolder}
        <ReactCardFlip isFlipped={outflipped} flipDirection="horizontal">
          <ReactCardFlip key={'nomal'} isFlipped={flipped} flipDirection="horizontal">
            <Card
              key={'front'}
              hoverable
              variant="borderless"
              className="card-style"
              onClick={() => {
                setFlipped(true)
                getPoem()
              }}
            >
              <span onClick={f_success}>
                {showExpressions.join('')}
                {result}
              </span>
            </Card>
            <Card
              key={'back'}
              hoverable
              variant="borderless"
              className="card-style"
              style={{ fontSize: '25px' }}
              onClick={() => setFlipped(false)}
            >
              <span onClick={b_success}>
                <p style={{ textAlign: 'left', textIndent: '2em' }}>{poem}</p>
                <p style={{ fontSize: '20px', fontStyle: 'italic' }}>{from}</p>
              </span>
            </Card>
          </ReactCardFlip>
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
      <div className="content">
        <Carousel
          arrows
          dots={false}
          // dotPosition="left"
          infinite={false}
          style={{ width: '500px', height: '130px' }}
        >
          <div>
            {str}
            <Card hoverable variant="borderless" style={contentStyle}>
              <div className="button-top-grid">
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
            </Card>
            {str}
          </div>
          <div>
            {str}
            <Card hoverable variant="borderless" style={contentStyle}>
              <div className="button-top-grid">
                <Button className="button-style" type="primary" onClick={() => onClick('sin(')}>
                  sin
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('cos(')}>
                  cos
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('tan(')}>
                  tan
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('^')}>
                  ^
                </Button>
              </div>
            </Card>
            {str}
          </div>
        </Carousel>
        <Row className="row-style">
          <Col span={18} style={{ height: '200px' }}>
            <div style={{ height: '13px' }}></div>
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
          </Col>
          <Col span={6} style={{ height: '200px' }}>
            {str}
            <Carousel
              arrows
              dots={false}
              dotPosition="left"
              infinite={false}
              style={{ width: '140px', height: '450px' }}
            >
              <div>
                <Card hoverable variant="borderless" style={c_contentStyle}>
                  <div className="button-left-grid">
                    <Button className="button-style" type="primary" onClick={() => onClick('*')}>
                      ×
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('/')}>
                      ÷
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('.')}>
                      .
                    </Button>
                    <Button className="e-button-style" type="primary" onClick={() => evaluating()}>
                      =
                    </Button>
                  </div>
                </Card>
                {str}
              </div>
              <div>
                <Card hoverable variant="borderless" style={c_contentStyle}>
                  <div className="button-left-grid">
                    <Button className="button-style" type="primary" onClick={() => onClick('log(')}>
                      ln
                    </Button>
                    <Button
                      className="button-style"
                      type="primary"
                      onClick={() => onClick('log10(')}
                    >
                      lg
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('(')}>
                      (
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick(')')}>
                      )
                    </Button>
                  </div>
                </Card>
                {str}
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home
