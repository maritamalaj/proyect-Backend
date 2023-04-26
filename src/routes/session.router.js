import { Router } from "express";
import usersModel from '../dao/models/users.models.js';

const router = Router ()
router.post('/register', async (req, res) =>{
    const userNew = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }

    const emptyFields = Object.values(userNew).includes('')
    if (emptyFields){
        return res.render('session-views/register',{error: 'There are empty or invalid fields'})
    }

    const user = new usersModel(userNew)
    await user.save()

    res.redirect('/views/login')
})
router.post('/login', async (req, res) =>{
    const userForm = req.body

    if (userForm.email == 'adminCoder@coder.com' && userForm.password == 'adminCod3r123'){
        delete userForm.password
        userForm.first_name = 'Administrator'
        userForm.role = 'admin'
        req.session.user = userForm

        return res.redirect('/views/products')
    }
    const userFind = await usersModel.findOne({email:userForm?.email, password:userForm?.password}).lean().exec()
    if (!userFind) return res.status(401).render('session-views/login',{error: 'User not found or Incorrect password'})
    else {
        delete userFind.password
        req.session.user = userFind
        res.redirect('/views/products')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/views/login')
})

export default router;