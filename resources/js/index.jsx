import { BrowserRouter } from "react-router-dom";
import '../css/app.css';
import './bootstrap';
import 'flowbite'
import App from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('frontend-app'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App></App>
            </PersistGate>
        </Provider>
    </BrowserRouter>
)