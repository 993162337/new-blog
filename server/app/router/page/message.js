import handler from "../../handle/study"

export default app => {
  app.get("/fetchAllMessage", (req, res) => {
      handler.fetchAllMessage(req, res)
  })

  app.post("/insertMessage", (req, res) => {
      handler.insertMessage(req, res)
  })
}
