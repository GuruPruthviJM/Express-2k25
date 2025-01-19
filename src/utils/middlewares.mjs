import mockUsers from "./data.mjs";

export const resolveIndexByUserId = (req, res, next) => {
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