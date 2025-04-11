# express api template

Template for express api:

## Features

- Express API with route validation from Joi
- Automatic type generation from Joi Schemas
- Automatic Swagger doc generation (Open Api 3.0.0)
- Swagger UI route (http://localhost:3001/api-docs)

## example routes

Out of the box you'll find 2 routes
Search Examples:

```
endpoint: http://localhost:3001/api/example
method: POST
body: {
  ids: [1234, 2345]
}
```

Get Example by ID:

```
endpoint: http://localhost:3001/api/example/1234
method: GET
```

Each example router has it's own controller and validation.
Route Validation is done through Joi Schemas

## current flow (ready for you to add services and integrations)

Request -> Routers -> Controller -> Response

## Generate types and api docs from Joi schemas

1. Run `npm run generate`
1. Types will generate to /interfaces/joi-types
1. Swagger docs will generate to /docs/swagger.json

## run locally

Run the following (provided you have run `npm install` alread)

```
npm start
```

For debugging, you can setup a basic debugger that just runs the start script.
ex: for VS Code I have added a .vscode/launch.json file already
