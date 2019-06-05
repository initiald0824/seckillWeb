import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import pathToRegexp from 'path-to-regexp';

class GoodsDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goodsId: null
    }
  }

  componentWillMount () {
    this.init()
  }

  init () {
    this.initGoodsId();
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

  render () {
    return (
      <div>GoodsDetail</div>
    )
  }
}

export default withRouter(GoodsDetail);
