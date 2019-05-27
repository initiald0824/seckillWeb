import React, {Component} from 'react';
import { Route, Redirect } from "react-router-dom";
import { getToken } from "@utils/uitl";
import { authorization } from "@/services/login/login";

class FrontendAuth extends Component {
  render() {
    const { location, config } = this.props;
    const { pathname } = location;

    const token = getToken();

    authorization()

    const targetRrouterConfig = config.find(v => v.path === pathname);

  }
}

export default FrontendAuth;
