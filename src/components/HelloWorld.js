import React, { Component } from 'react';
import request from '@utils/request';

class HelloWorld extends Component {

  componentDidMount() {
    let url = {
      api: '/api/test',
    };
    request.get(url, {a: 1}, function(res) {
    }, function(res) {
    })
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
}

export default HelloWorld;
