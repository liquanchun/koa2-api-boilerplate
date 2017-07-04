<h1>Basc API made on KoaJS 2</h1>

<h2>Installation</h2>

```
git clone https://github.com/valera-shulghin/koa2-api-boilerplate
npm install
npm start
open http://localhost:3000/apidoc/
```

<h2>Requirements</h2>

<ul>
    <li>NodeJS >= 7.6</li>
</ul>


<h2>Features</h2>
<ul>
    <li>KoaJS 2</li>
    <li>Automatic documentation generation with gulp</li>
    <li>PostgreSQL database</li>
    <li>Nice and clean error handler</li>
</ul>


<h2>Structure</h2>

```
├── app                               # Server configuration settings
│   ├── country                       # Environment specific config
│   │   ├── routes
|   |   |   └── get_countries_list.js # Get countries list
|   |   ├── model.js                  # Country database operations
├── libraries
|   ├── error.js                      # Error types definition (ex. Unauthorized or BadRequest)
|   ├── error_handler.js              # Koa2 middleware for error handle
|   ├── jwt.js                        # JWT wrapper for token encode and decode
|   ├── knex.js                       # Knex wrapper for database connection
|   └── string.js                     # String manipulations (ex. Password encription)
├── middlewares
|   └── auth.js                       # JWT auth Koa2 middleware
├── .gitignode                        # GitIgnore files
├── env.json                          # API Config file
├── gulpfile.js                       # Gulp tasks configuration
├── index.js                          # API startup file
├── package.json                      # Packages list
└── readme.md                         # 
```
