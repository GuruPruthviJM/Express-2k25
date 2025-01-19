import { Router } from "express";

const router = Router();

router.get('/api/products', (req, res) => {
    res.send([
        {id: 1, name: "Laptop", price: 255},
        {id: 2, name: "Dekstop", price: 450},
        {id: 3, name: "Mobile", price:330}
    ])
})

export default router;