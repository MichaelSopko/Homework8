/**
 * Created by Michael on 22.10.2015.
 */
module.exports = function(req, res, next){

    if(req.session && req.session.user){
        res.cookie("user", req.session.user);
    }else{
        res.clearCookie("user");
    }
    next();
};