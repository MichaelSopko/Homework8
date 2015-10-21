/**
 * Created by Michael on 21.10.2015.
 */
module.exports = function (req, res, next) {
    if(req.session && req.session.user) {
        next();
    }else{
        return next(new Error(403));
    }
};

