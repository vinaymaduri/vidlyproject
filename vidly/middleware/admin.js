

function admin(req,res,next)
{
 if(!req.users.isAdmin)return res.status(403).send('access denied')
 next()
}

module.exports=admin