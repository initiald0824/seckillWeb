import React, {Component} from 'react';
import { Route, Redirect } from "react-router-dom";
import { getToken } from "@utils/uitl";
import { authorization } from "@/services/login/login";

class FrontendAuth extends Component {
  render() {
    const { location, config } = this.props;
    const { pathname } = location;

    const token = getToken();

    let isLogin = false;
    authorization({ token }, (res) => {
      isLogin = true;
    }, (err) => {
      console.log('err', err)
    });

    const targetRouterConfig = config.find(v => v.path === pathname);

    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
      const { component } = targetRouterConfig;
      return <Route exact path={pathname} component={component} />
    }

    if (isLogin) {
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
        return <Redirect to='/login'/>
      }
    }
  }
}

export default FrontendAuth;
