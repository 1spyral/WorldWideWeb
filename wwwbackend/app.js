import express from "express";
import cors from "cors";
import cityRoutes from "./routes/cityRoutes.js";
import morgan from "morgan";

class App {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.setup();
    }

    setup() {
        this.app.use(express.json());

        this.app.use(cors());

        this.app.use(morgan("combined"));

        this.app.use("/city", cityRoutes)
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

export default App;