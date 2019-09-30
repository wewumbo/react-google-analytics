import React, { useState, useEffect } from "react";
import indexRoutes from "./routes/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { GoogleProvider } from "react-analytics-widget";
(function(w, d, s, g, js, fjs) {
  g = w.gapi || (w.gapi = {});
  g.analytics = {
    q: [],
    ready: function(cb) {
      this.q.push(cb);
    }
  };
  js = d.createElement(s);
  fjs = d.getElementsByTagName(s)[0];
  js.src = "https://apis.google.com/js/platform.js";
  fjs.parentNode.insertBefore(js, fjs);
  js.onload = function() {
    g.load("analytics");
  };
})(window, document, "script");

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    //Run command: php -S localhost:8088 -t ./ first with PHP source including
    const request = new Request("http://localhost:8088", {
      method: "GET"
    });
    fetch(request)
      .then(response => response.json())
      .then(({ access_token }) => {
        console.log({ access_token });
        setToken(access_token);
      });
  });

  return (
    <GoogleProvider accessToken={token}>
      <Provider store={configureStore()}>
        <Router basename="/">
          <Switch>
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} key={key} component={prop.component} />
              );
            })}
          </Switch>
        </Router>
      </Provider>
    </GoogleProvider>
  );
}

export default App;
