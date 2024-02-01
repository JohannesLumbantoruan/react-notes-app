import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import "./styles/style.css";

import NoteApp from "./components/NoteApp";

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <NoteApp />
        </BrowserRouter>
    </React.StrictMode>
);