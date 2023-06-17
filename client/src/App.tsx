import React from "react";
import { List } from "./components/List";

const App = () => {
    return (
        <div className="App">
            <h1 className="App__title">TO-DO App</h1>
            <List />
        </div>
    )
}

export { App };