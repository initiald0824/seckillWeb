import React, { Component } from 'react';
import { querySeckillGoods } from "@/services/goods/goods";
import { Table } from "antd";
import {Link} from "react-router-dom";

class Goods extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seckillGoods: []
    };
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'goodsName'
      },
      {
        title: '商品图片',
        dataIndex: 'goodsImg',
        render: (text) => {
          return (
            <img src={text} alt="" style={{width: '100px'}} />
          )
        }
      },
      {
        title: '商品原价',
        dataIndex: 'goodsPrice'
      },
      {
        title: '秒杀价',
        dataIndex: 'seckillPrice'
      },
      {
        title: '库存数量',
        dataIndex: 'stockCount'
      },
      {
        title: '详情',
        dataIndex: 'goodsDetail',
        render: (text, row) => {
          return (
            <Link to={'/goodsDetail/'+row.id}>{text}</Link>
          )
        }
      }
    ]
  }

  componentWillMount () {
    this.getSeckillGoods()
  }

  getSeckillGoods () {
    querySeckillGoods({}, (res) => {
      this.setState({
        seckillGoods: res.data
      })
    })
  }

  render () {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.state.seckillGoods} rowKey={record => record.id} />
      </div>
    )
  }
}

export default Goods;
