import { Router } from 'express'

class Routes {
  readonly router: Router

  constructor () {
    this.router = Router()

    this.mountRoutes()
  }

  mountRoutes () {
    this.router.get('/connector/status/health', async (req, res) => {
      const statusCode = req.headers.status
      return res.status(Number(statusCode) || 200).send("App Running")
    })

    this.router.get('/connector/multiple/first', async (req, res) => {
      return res.status(200).json({ parameter: "second" })
    })

    this.router.get('/connector/multiple/second', async (req, res) => {
      return res.status(200).send({ parameter: "third", name: "Server Running"})
    })

    this.router.post('/connector/multiple/third', async (req, res) => {
      const { name } = req.body
      if (!name){
        return res.status(400).json({ message: "Error on third request" })
      }
      return res.status(200).json({ parameter: "four", token: "my-secret-token", application: "third-request", name: "My Server is working" })
    })

    this.router.post("/connector/multiple/four", async (req, res) => {
      const token = req.headers.authorization
      const application = req.headers.application
      const { name } = req.body
      if (!token || !application || !name){
        return res.status(400).json({ message: "Error on four request" })
      }
      return res.status(200).json({ message: "Four Request is OK" })
    })
  }
}

export default new Routes().router
