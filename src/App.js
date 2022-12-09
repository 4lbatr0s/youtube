import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { store } from "./redux/store";
import { Provider } from 'react-redux'
import Login from "./pages/login/login";

function App() {

  //INFO: How to render admin panel depending on the isAdmin property of the 
  let admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).isAdmin;
  admin = true;
  return (
    <Router>
      <Switch> {/**INFO: By putting switch on top of the route, and putting login after switch and before other routes helps us with not showing other pages without logging in to the web page!  */}
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>

            </div>
          </>
        )
        }

      </Switch>
    </Router>
  );
}

export default App;
