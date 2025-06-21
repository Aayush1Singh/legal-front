import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./services/store.js";
import { Provider } from "react-redux";
import Loader from "./components/Loader.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App /> {/* <Loader></Loader> */}
  </Provider>
);
