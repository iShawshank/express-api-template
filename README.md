# express api template

Template for a beginning api

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

Each example router has it's own controller and validator methods.

## current flow (ready for you to add services and integrations)

Request -> Routers -> Controller -> Response

## run locally

Run the following (provided you have run `npm install` alread)

```
npm start
```

For debugging, you can setup a basic debugger that just runs the start script.
ex: for VS Code I have added a .vscode/launch.json file already
