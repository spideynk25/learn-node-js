// const userDB = {
//     users: require('../model/users.json'),
//     setUsers : function(data) {this.users = data}
// }

const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const fsPromises = require('fs').promises
// const path = require('path')

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({'message' : 'Username and Password are required'})
    // const foundUser = userDB.users.find(person => person.username === user)
    const foundUser = await User.findOne({username: user}).exec()
    if(!foundUser) return res.sendStatus(401) //unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match){
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}

        )
        const newrefreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        // Saving refreshToken with current user
        // const otherUsers = userDB.users.filter(person => person.username !== foundUser.username)
        // const currentUser = {...foundUser, refreshToken}
        // userDB.setUsers([...otherUsers, currentUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(userDB.users)
        // )

        const newRefreshTokenArray = !cookies?.jwt?foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt)

        if(cookies?.jwt) res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        
        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newrefreshToken]
        const result = await foundUser.save()
        console.log(result);

        res.cookie('jwt', newrefreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}) //secure: true
        res.json({roles, accessToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}