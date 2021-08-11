import express from 'express'
import routes from './routes'

class Application {
  public express: express.Application;

  constructor () {
    this.express = express()

    this.includeRoutes()
  }


  private includeRoutes (): void {
    this.express.use('/', routes)
  }
}

export default new Application().express
