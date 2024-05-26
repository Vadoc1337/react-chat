import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";

import './index.css'
import App from './App'
import theme from "./theme";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)

// TODO удалить после отладки React.StrictMode