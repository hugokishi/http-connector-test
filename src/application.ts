import express from 'express'
import routes from './routes'

class Application {
  public express: express.Application;

  constructor () {
    this.express = express()

    this.includeMiddlewares()
    this.includeRoutes()
  }


  private includeRoutes (): void {
    this.express.use('/', routes)
  }

  private includeMiddlewares(): void {
    this.express.use(express.json())
  }
}

export default new Application().express
