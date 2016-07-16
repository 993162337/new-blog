import { createServer } from "./sever"
import router from "./router"

const app = createServer()

router.construct(app)
