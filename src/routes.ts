import { Router } from 'express'

class Routes {
  readonly router: Router

  constructor () {
    this.router = Router()

    this.mountRoutes()
  }

  mountRoutes () {
    this.router.get('/health', async (req, res) => {
      const statusCode = req.headers.status
      return res.status(Number(statusCode) || 200).send("App Running")
    })
  }
}

export default new Routes().router
