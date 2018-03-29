var {User} = require ('./../models/user.js');


var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return res.send(user);
    }).catch((e)=>{
        res.status(401).send(e);
    })
    req.user = user;
    req.token = token;
};

module.exports = {
    authenticate
}
