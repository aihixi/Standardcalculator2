// src/views/Home.tsx (确保此文件存在并包含以下内容)
import '../mystyles/homestyle.css'
import React from 'react'
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

  const onClick = (value: string): void => {
    // TODO: 实现按钮点击逻辑
    console.log('Button clicked:', value)
  }

  const onClick_ac = (): void => {
    // TODO: 实现清空逻辑
    console.log('Clear clicked')
  }

  const onClick_de = (): void => {
    // TODO: 实现删除逻辑
    console.log('Delete clicked')
  }

  const evaluating = (): void => {
    // TODO: 实现计算逻辑
    console.log('Evaluate clicked')
  }

  return (
    <div className="page">
      <div className="page-header">
        标准计算器
        <Card hoverable variant="borderless" className="card-style">
          文字
        </Card>
      </div>
      <div className="content">
        <Carousel arrows infinite={false} style={{ width: '500px', height: '130px' }}>
          <div>
            {str}
            <Card hoverable variant="borderless" style={contentStyle}>
              <div className="button-top-grid">
                <Button className="button-style" type="primary" onClick={() => onClick('AC')}>
                  sin
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('DEL')}>
                  cos
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('+')}>
                  tan
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('-')}>
                  ^
                </Button>
              </div>
            </Card>
            {str}
          </div>
          <div>
            {str}
            <Card hoverable variant="borderless" style={contentStyle}>
              <div className="button-top-grid">
                <Button className="button-style" type="primary" onClick={() => onClick('AC')}>
                  sin
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('DEL')}>
                  cos
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('+')}>
                  tan
                </Button>
                <Button className="button-style" type="primary" onClick={() => onClick('-')}>
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
              <Button className="button-style" type="primary" onClick={() => onClick('9')}>
                9
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('4')}>
                4
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('1')}>
                1
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('9')}>
                9
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('4')}>
                4
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('1')}>
                1
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('9')}>
                9
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('4')}>
                4
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('1')}>
                1
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('9')}>
                9
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('4')}>
                4
              </Button>
              <Button className="button-style" type="primary" onClick={() => onClick('1')}>
                1
              </Button>
            </div>
          </Col>
          <Col span={6} style={{ height: '200px' }}>
            {str}
            <Carousel
              arrows
              dotPosition="left"
              infinite={false}
              style={{ width: '140px', height: '450px' }}
            >
              <div>
                <Card hoverable variant="borderless" style={c_contentStyle}>
                  <div className="button-left-grid">
                    <Button className="button-style" type="primary" onClick={() => onClick('9')}>
                      9
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('4')}>
                      4
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('1')}>
                      1
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('e')}>
                      e
                    </Button>
                  </div>
                </Card>
                {str}
              </div>
              <div>
                <Card hoverable variant="borderless" style={c_contentStyle}>
                  <div className="button-left-grid">
                    <Button className="button-style" type="primary" onClick={() => onClick('9')}>
                      9
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('4')}>
                      4
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('1')}>
                      1
                    </Button>
                    <Button className="button-style" type="primary" onClick={() => onClick('e')}>
                      e
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
