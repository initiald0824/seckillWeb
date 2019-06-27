import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import pathToRegexp from 'path-to-regexp';
import { queryGoodsDetail } from "@/services/goods/goods";
import { Card, Row, Col, Button } from 'antd';
import dateformat from 'dateformat';
import { execSeckill, getSecillStatus, getSeckillPath } from "@/services/seckill/seckill";

class GoodsDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goodsId: null,
      goodsDetail: null,
      seckillPath: null
    };
    this.seckill = this.seckill.bind(this);
  }

  componentWillMount () {
    this.init();
    this.timer = setInterval(() => {
      if (this.state.goodsDetail && this.state.goodsDetail.remainSeconds > 0) {
        let goodsDetail = this.state.goodsDetail;
        if (goodsDetail.remainSeconds === 1) {
          goodsDetail.seckillStatus = 'started'
        }
        goodsDetail.remainSeconds = goodsDetail.remainSeconds - 1;
        this.setState({
          goodsDetail: goodsDetail
        })
      }
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  async init () {
    await this.initGoodsId();
    this.getGoodsDetail();
  }

  getGoodsDetail () {
    queryGoodsDetail({id: this.state.goodsId}, (res) => {
      this.setState({
        goodsDetail: res.data
      })
    })
  }

  initGoodsId () {
    const re = pathToRegexp('/goodsDetail/:id');
    const match = re.exec(this.props.location.pathname);
    if (match) {
      this.setState({
        goodsId: match[1]
      });
    }
  }

  dateFormat (date) {
    let d = new Date(date);
    return dateformat(d, 'yyyy-mm-dd HH:MM:ss')
  }

  secondFormat (sec) {
    let hour = Math.round(sec / 3600);
    let min = Math.round((sec % 3600) / 60);
    let second = sec % 60;
    let res = '';
    if (hour) {
      res += hour + '小时'
    }
    if (min) {
      res += min + '分钟'
    }
    if (second) {
      res += second + '秒'
    }
    return res;
  }

  getSeckillStatus (goodsId) {
    getSecillStatus({ goodsId: goodsId }, (res) => {
      const result = res.data;
      if (result < 0) {
        this.props.history.push('/seckillFail');
      } else if (result > 0) {
        this.props.history.push('/orderDetail/' + result);
      } else {
        setTimeout(() => {
          this.getSeckillStatus(goodsId);
        }, 50)
      }
    })
  }

  async getSeckillPath () {
    return new Promise((resolve, reject) => {
      getSeckillPath(({ goodsId: this.state.goodsId }), (res) => {
        if (res.code === 0) {
          this.setState({
            seckillPath: res.data
          });
          resolve();
        } else {
          reject(new Error(res.message));
        }
      }, () => {
        reject(new Error('获取秒杀接口失败'))
      })
    });
  }

  async seckill () {
    await this.getSeckillPath();
    execSeckill({
      seckillPath: this.state.seckillPath,
      goodsId: this.state.goodsId
    }, (res) => {
      if (res.code === 0 ) {
        this.getSeckillStatus(this.state.goodsId)
      }
    }, () => {
      this.props.history.push('/seckillFail')
    })
  }

  render () {
    return (
      <div>
        {
          this.state.goodsDetail &&
          <Card title="商品详情" style={{width: '100%'}}>
            <Row>
              <Col span={8}>商品名称</Col>
              <Col span={16}>{this.state.goodsDetail.goodsTitle}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>商品图片</Col>
              <Col span={16}><img src={this.state.goodsDetail.goodsImg} alt="" style={{width: '100px'}} /></Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>秒杀开始时间</Col>
              <Col span={8}>{this.dateFormat(this.state.goodsDetail.startDate)}</Col>
              <Col span={8}>
                {
                  this.state.goodsDetail.seckillStatus === 'preparing' &&
                  <span>秒杀倒计时: <span>{this.secondFormat(this.state.goodsDetail.remainSeconds)}</span></span>
                }
                {
                  this.state.goodsDetail.seckillStatus === 'started' &&
                  <span>秒杀进行中</span>
                }
                {
                  this.state.goodsDetail.seckillStatus === 'ended' &&
                  <span>秒杀已结束</span>
                }
              </Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>商品原价</Col>
              <Col span={8}>{this.state.goodsDetail.goodsPrice}</Col>
              <Col span={8}>
                <Button onClick={this.seckill}
                        disabled={this.state.goodsDetail.seckillStatus !== 'started'} type="primary">立即秒杀</Button>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>秒杀价</Col>
              <Col span={16}>{this.state.goodsDetail.seckillPrice}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>库存数量</Col>
              <Col span={16}>{this.state.goodsDetail.stockCount}</Col>
            </Row>
            <hr />
          </Card>
        }
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
