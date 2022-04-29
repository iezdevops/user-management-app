const axios = require('axios')

exports.homeRoutes = async (req, res) => {
    //Make a get request to /api/users
    try {
        const ax = await axios.get('http://localhost:3000/api/users')
        res.render('index',{users:ax.data})
    } catch (e) {
        res.send(e)
    }
    
}

exports.add_user = (req,res) => {
    res.render('add_user') 
}

exports.update_user =async (req, res) => {
    try {
        const userdata = await axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
     
        res.render('update_user',{user:userdata.data})
    } catch (e) {
        res.send(e)
    }
}
