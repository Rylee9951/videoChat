import React, { useState } from "react"
import "normalize.css/normalize.css"
import "../styles/App.css"
import VideoChat from "./VideoChat"
import { Provider } from "react-redux"
import store from "../store"

export default props => {
  return (
    <div className="app">
      <header>
        <h1>Tech Talk with Hooks</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="React">
            ⚛
          </span>{" "}
          by Ryan Lee
        </p>
      </footer>
    </div>
  )
}
