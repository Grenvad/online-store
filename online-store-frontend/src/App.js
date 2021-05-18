import { Header } from "./components";
import { Home, Cart, Checkout } from "./pages";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/checkout" component={Checkout} exact />
      </div>
    </div>
  );
}

export default App;
