import { Header } from "./components";
import { Home, Cart, Checkout } from "./pages";
import { Route } from "react-router-dom";
import Product from "./pages/Product";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/checkout" component={Checkout} exact />
        <Route exact path="/product/:id" component={Product} />
      </div>
    </div>
  );
}

export default App;
