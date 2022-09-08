
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Footer from './Comp/Footer';
import Header from './Comp/Header';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import SubFooter from './Comp/SubFooter';
import Order from './Pages/Order';
import Success from './Pages/Success';


function App() {

 
  return (

    <div class="container-fluid p-0">
      <BrowserRouter >
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/success" component={Success} />

        </Switch>
        <SubFooter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
