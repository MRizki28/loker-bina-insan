import { BrowserRouter } from "react-router-dom";
import '../css/app.css';
import './bootstrap';
import 'flowbite'
import App from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('frontend-app'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App></App>
        </Provider>
    </BrowserRouter>
)