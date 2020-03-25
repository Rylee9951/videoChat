const express = require("express")
const app = express()
const server = require("http").Server(app)
const pino = require("express-pino-logger")()
const config = require("./config.js")
const { chatToken, videoToken, voiceToken } = require("./tokens/index")
// const io = require("socket.io")(server)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.use(pino)

// app.use("/api", require("./routes/api"))
// app.use("/", require("./routes/index"))

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json")
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  )
}

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World"
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

app.get("/chat/token", (req, res) => {
  const identity = req.query.identity
  const token = chatToken(identity, config)
  sendTokenResponse(token, res)
})

app.post("/chat/token", (req, res) => {
  const identity = req.body.identity
  const token = chatToken(identity, config)
  sendTokenResponse(token, res)
})

app.get("/video/token", (req, res) => {
  const identity = req.query.identity
  const room = req.query.room

  const token = videoToken(identity, room, config)
  sendTokenResponse(token, res)
})

app.post("/video/token", (req, res) => {
  const identity = req.body.identity
  const room = req.body.room
  console.log(config)
  const token = videoToken(identity, room, config)
  sendTokenResponse(token, res)
})

app.get("/voice/token", (req, res) => {
  const identity = req.body.identity
  const token = voiceToken(identity, config)
  sendTokenResponse(token, res)
})

app.post("/voice/token", (req, res) => {
  const identity = req.body.identity
  const token = voiceToken(identity, config)
  sendTokenResponse(token, res)
})
app.use((req, res, next) => {
  let err = new Error("Not Found")
  err.status = 404
  next(err)
})

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500)
    res.json({
      error: err
    })
  })
}

if (app.get("env") === "production") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: "Oops. Our bad."
    })
  })
}
server.listen(8000, () => {
  console.log("Server listening on port 8000")
})
