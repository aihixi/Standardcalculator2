// src/views/Home.tsx (确保此文件存在并包含以下内容)
import '../mystyles/homestyle.css'
import React, { useState } from 'react'
import { evaluate } from 'mathjs'
import { Button, Card, Carousel, Row, Col } from 'antd'

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
  const [tempArr, setTempArr] = useState<string[]>([])
  const [result, setResult] = useState<string>('')
  const EPSILON = 1e-12 // 误差阈值

  const onClick = (num: string): void => {
    setTempArr([]) // 清空临时数组
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
    } else if (num === 'log10') {
      setShowExpressions((prev) => [...prev, 'lg'])
    } else if (num === 'log') {
      setShowExpressions((prev) => [...prev, 'ln'])
    } else if (num === 'atan') {
      setShowExpressions((prev) => [...prev, 'tan⁻¹'])
    } else {
      setShowExpressions((prev) => [...prev, num])
    }
    console.log(showExpressions)
  }

  const onClick_ac = (): void => {
    // TODO: 实现清空逻辑
    setShowExpressions([])
    setExprArr([])
    setTempArr([])
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
    setTempArr([...showExpressions])
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
      setResult('你认真的吗？')
      return NaN
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ height: '20px' }} />
        <Card hoverable variant="borderless" className="card-style">
          {showExpressions.join('')}
          {result}
        </Card>
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
                <Button className="button-style" type="primary" onClick={() => onClick('sin')}>
                  sin
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('cos')}>
                  cos
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('tan')}>
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
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('7')}
              >
                7
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('8')}
              >
                8
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('9')}
              >
                9
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('4')}
              >
                4
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('5')}
              >
                5
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('6')}
              >
                6
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('1')}
              >
                1
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('2')}
              >
                2
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('3')}
              >
                3
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('pi')}
              >
                π
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('0')}
              >
                0
              </Button>
              <Button
                className="button-style"
                type="primary"
                style={{ color: 'black' }}
                onClick={() => onClick('e')}
              >
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
                    <Button className="button-style" type="primary" onClick={() => onClick('log')}>
                      ln
                    </Button>
                    <Button
                      className="button-style"
                      type="primary"
                      onClick={() => onClick('log10')}
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
