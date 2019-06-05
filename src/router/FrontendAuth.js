import React, {Component} from 'react';
import { Route, Redirect } from "react-router-dom";
import { authorization } from "@/services/login/login";
import pathToRegexp from 'path-to-regexp';

class FrontendAuth extends Component {

  render() {
    const { location, config } = this.props;
    const { pathname } = location;

    const targetRouterConfig = config.find(v => pathToRegexp(v.path).exec(pathname));

    let isLogin = localStorage.getItem('isLogin');

    if (isLogin !== 'true') {
      authorization({}, () => {
        localStorage.setItem('isLogin', 'true');
      })
    }

    if (targetRouterConfig && !targetRouterConfig.auth && isLogin !== 'true') {
      const { component } = targetRouterConfig;
      return <Route exact path={pathname} component={component} />
    }

    if (isLogin === 'true') {
      // 如果是登录状态
      if (pathname === '/login') {
        return <Redirect to='/' />
      } else {
        if (targetRouterConfig) {
          return <Route path={pathname} component={targetRouterConfig.component} />
        }
      }
    } else {
      if (targetRouterConfig && targetRouterConfig.auth) {
        return <Redirect to='/login' />
      }
    }
  }
}

export default FrontendAuth;
