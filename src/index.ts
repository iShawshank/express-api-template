import App from './app'
import serverless from 'serverless-http'
import ExampleRouter from './routers/exampleRouter'

const port = 3001

const routers = [new ExampleRouter().expressRouter]

const app = new App(routers, port)

app.listen()

// const serverlessHandler = serverless(app.getExpressApp())

// export const handler = async (event, context) => {
//   const result = await serverlessHandler(event, context)
//   return result
// }
