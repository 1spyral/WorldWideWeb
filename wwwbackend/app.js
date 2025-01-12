import express from "express";
import cityRoutes from "@routes/cityRoutes";

class App {
    constructor(store) {
        this.app = express();
        this.port = 3000;
        this.store = store;
        this.loadRoutes();
    }

    loadRoutes() {
        this.app.use("/city", cityRoutes)
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}