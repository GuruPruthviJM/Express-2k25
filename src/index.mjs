import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

const resolveIndexByUserId = (req, res, next) => {
    const {params: {id}} = req; 
    const parseId=parseInt(id, 10);
    if(isNaN(parseId)){
        return res.sendStatus(400)
    }
    const userIndex = mockUsers.findIndex(user => user.id === parseId);
    if(userIndex === -1) return res.sendStatus(404);
    req.userIndex = userIndex;
    // req.id = parseId;
    next();
}

// GET Method
app.get('/', loggingMiddleware, (req, res) => {
    res.send("Hello, world!");    
})



let mockUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com"
    },
    {
        id: 2,
        name: "Guru Pruthvi",
        email: "guru.pruthvi@example.com"
    },
    {
        id: 3,
        name: "Mahesh",
        email: "mahesh@example.com"
    }
]

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/users',
    // we can have multiple middlewares for same function
     (req, res, next)=>{ // Middleware A
        console.log("Base URL");
        next();
     },
     (req, res) => { // Middleware B
    const {filter, value} = req.query;
    if(!filter||!value){
        return res.send(mockUsers)
    }
    
    const filteredUsers = mockUsers.filter(user => user[filter].toLowerCase().includes(value.toLowerCase()));
    if(!filteredUsers.length) return res.status(404).send("No users found")
    return res.send(filteredUsers)
})

app.get('/api/users/:id', (req, res) => {
    const parseID = parseInt(req.params.id);
    if(isNaN(parseID)){
        return res.status(400).send("Bad request, invalid id")
    }
    let user = mockUsers.filter(user => user.id === parseID);
    if(!user.length) return res.status(404).send("User not found")
    res.send(user)
})

app.get('/api/products', (req, res) => {
    res.send([
        {id: 1, name: "Laptop", price: 255},
        {id: 2, name: "Dekstop", price: 450},
        {id: 3, name: "Mobile", price:330}
    ])
})

//POST Method

app.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({ message: "Name and email are required" });
    }
    const newUser = {
        id: mockUsers.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    mockUsers.push(newUser);
    return res.status(200).send(mockUsers)
})

// Put
// Here we are going to update the complete data of a particular object

app.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {userIndex, params, body} = req.userIndex;
    let id = parseInt(params.id); 
    mockUsers[userIndex] = {id,...body}
    return res.status(200).send(mockUsers[userIndex])
})

// Patch

app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    let userIndex = req.userIndex
    mockUsers[userIndex] = {...mockUsers[userIndex],...req.body}
    return res.status(200).send(mockUsers[userIndex])
})

// Delete

app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    let userIndex = req.userIndex
    mockUsers.splice(userIndex, 1);
    return res.sendStatus(204)
})