import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router";
import { Provider } from "react-redux";
import "./style/style.css";
import "./style/scrollBar.css"
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterCustom />
    </BrowserRouter>
  </Provider>
);
