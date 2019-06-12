import React, { Component } from 'react';
import { queryOrderDetail } from "@/services/seckill/seckill";
import pathToRegexp from 'path-to-regexp';
import dateformat from 'dateformat';
import { Card, Row, Col, Button } from "antd";

const orderStatusDict = {
  0: '未支付',
  1: '已支付',
  2: '已发货',
  3: '已收货',
  4: '已退款',
  5: '已完成'
};

class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      orderDetail: null
    };
  }
  componentWillMount () {
    this.init();
  }

  async init() {
    await this.initOrderId();
    this.getOrderDetail();
  }

  initOrderId () {
    const re = pathToRegexp('/orderDetail/:id');
    const match = re.exec(this.props.location.pathname);
    if (match) {
      this.setState({
        orderId: match[1]
      });
    }
  }

  dateFormat (date) {
    let d = new Date(date);
    return dateformat(d, 'yyyy-mm-dd HH:MM:ss');
  }

  getOrderDetail () {
    queryOrderDetail({ orderId: this.state.orderId }, (res) => {
      const orderInfo = res.data.orderInfo;
      const goodsInfo = res.data.seckillGoodsVo;
      const userInfo = res.data.seckillUser;
      let orderDetail = {
        goodsName: goodsInfo.goodsName,
        goodsImg: goodsInfo.goodsImg,
        seckillPrice: orderInfo.goodsPrice,
        createdTime: orderInfo.createDate,
        orderStatus: orderInfo.status,
        deliveryUser: userInfo.nickname,
        deliveryAddr: orderInfo.deliveryAddrId
      };
      this.setState({
        orderDetail: orderDetail
      })
    })
  }

  render () {
    return (
      <div>
        {
          this.state.orderDetail &&
          <Card title="订单详情" style={{width: '100%'}}>
            <Row>
              <Col span={8}>商品名称</Col>
              <Col span={16}>{this.state.orderDetail.goodsName}></Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>商品图片</Col>
              <Col span={16}><img src={this.state.orderDetail.goodsImg} alt="" style={{width: '100px'}} /></Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>订单价格</Col>
              <Col span={16}>{this.state.orderDetail.goodsPrice}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>下单时间</Col>
              <Col span={16}>{this.dateFormat(this.state.orderDetail.createdTime)}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>订单状态</Col>
              <Col span={8}>{orderStatusDict[this.state.orderDetail.orderStatus]}</Col>
              <Col span={8}>
                {
                  this.state.orderDetail.orderStatus === 0 &&
                  <Button type="primary">立即支付</Button>
                }
              </Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>收货人</Col>
              <Col span={16}>{this.state.orderDetail.deliveryUser}</Col>
            </Row>
            <hr />
            <Row>
              <Col span={8}>收货地址</Col>
              <Col span={16}>{this.state.orderDetail.deliveryAddr}</Col>
            </Row>
          </Card>
        }
      </div>
    )
  }
}

export default OrderDetail;
