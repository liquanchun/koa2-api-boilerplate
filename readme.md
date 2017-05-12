<h1>Basc API made on KoaJS</h1>

To run the api do: 
```
    git clone https://github.com/valera-shulghin/koa-basic-api/blob/master/index.js
    npm install
    npm start
    open http://localhost:3000/apidoc
```

<h2>Configuration</h2>
<p>All configurations are set from env.json file</p>
<p>Gulp automatically generates documentation and restarts server on changes. Check gulpfile.js for details. </p>

<h2>Error Handling</h2>
<p>KoaJS has a great error handler. I just extended it with more error types (check /libraries/error.js file), and now wherever I need to return an error (ex. Validation Error, Unauthorized or Model Error) I just throw it. </p>

<h2>Auth</h2>
<p>This API uses JWT(jsonwebtoken) module ( /middlewares/auth.js file ). You can define as many middlewares as you want and use them where you need.</p>

<h2>Application Structure</h2>
<p>Application is devised by modules. Each module has a model and a list of routes. </p>
<p>Each route is a separated file that contains validation and implementation of the route (two separated methods).  </p>