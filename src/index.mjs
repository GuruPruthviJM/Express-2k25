import express from "express";
import router from "express";
import routes from "./routers/index.mjs"
const app = express();

app.use(express.json());
app.use(routes)

const PORT = process.env.PORT || 3000;

// GET Method
app.get('/', (req, res) => {
    res.send("Hello, world!");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

