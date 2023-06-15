import passport from "passport";

export const passportCall =(strategy)=>{
    return async(req, res, next)=>{
        passport.authenticate(strategy, (err, user, info)=>{
            if(err) return next(err);
            if (user) req.user = user;
            next();
        })(req, res, next)
    }
}

export const authorization = (policies)=>{
    return async (req,res,next)=>{
        if (policies.includes('PUBLIC')) return next()
        if (policies.length>0){
            if (!req.user) return res.status(401).render('session-views/login',{error:'No hay Usuario logueado'});
            if (!policies.includes(req.user.user.role.toUpperCase())) return res.status(403).send({error:'Usuario sin permisos'});
            return next();
        }

    }
}