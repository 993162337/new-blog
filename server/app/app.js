import createServer from "./sever"
import router from "./router/router"

const app = createServer()

router(app)
