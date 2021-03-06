import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route , Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path="/Orders" exact component={Orders}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
