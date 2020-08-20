import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { MainPage, BoardPage, Test1, Test2, Test3, Test4, AuthPage } from "./components";

// apollo
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";

import { CookiesProvider } from "react-cookie";

const wsLink = new WebSocketLink({
    // apollo-server는 /graphql 이 기본으로 들어간다.
    // uri: `ws://localhost:5000/graphql`,
    uri: `wss://srello-server.herokuapp.com/graphql`,
    options: {
        reconnect: true,
    },
});

const client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <CookiesProvider>
            <React.StrictMode>
                <Router>
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <Route path="/board/:id" component={BoardPage} />
                        <Route path="/auth" component={AuthPage} />
                        <Route path="/test1" component={Test1} />
                        <Route path="/test2" component={Test2} />
                        <Route path="/test3" component={Test3} />
                        <Route path="/test4" component={Test4} />
                        <Redirect path="*" to="/" />
                    </Switch>
                </Router>
            </React.StrictMode>
        </CookiesProvider>
    </ApolloProvider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
