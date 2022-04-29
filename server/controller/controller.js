let Userdb = require('../model/model')

//export and save new user
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("Message: Content cannot be empty")
        return
    }
    const user = new Userdb(req.body)

    try {
        await user.save()
        res.redirect('/add-user')
    } catch (e) {
        res.status(500).send(e)
    }

    //     {
    //     name: req.body.name,
    //     email: req.body.email,
    //     gender: req.body.gender,
    //     status:req.body.status
    // })
    // user
    //     .save(user)
    //     .then(data => {
    //         res.send(data)
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occured"
    //         })
    //     })
    
}

//retrieve and return all users/ retreive and return a single user
exports.find = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id
        try {
            const userOne = await Userdb.findById(id)
            if (!userOne) {
                 res.status(404).send(`Not found user with id ${id}`)
            }
            else {
                return res.send(userOne)
            }
        } catch (e) {
            res.status(500).send(`Error retrieving user with this ${id}`)
        }
    }

    try {
        const user = await Userdb.find()
        res.send(user)
    } catch (e) {
        res.send(e)
    }
   
}

//update a new identified user by user id

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// exports.update = async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'gender', 'status']
//     const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send("Error: Invalid Update")
//     }
    
//     try {
//         const id = req.params.id
//         const updateUser = await Userdb.findByIdAndUpdate(id,req.body)
//         await updateUser.save()
//         res.send(updateUser)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// }

//Delete user with specified user id with their request
exports.delete =async (req, res) => {
    try {
        const user = await Userdb.findByIdAndDelete(req.params.id)
        if (!user) {
        res.status(404).send(`Cannot delete with id ${req.params.id}. Maybe id is wrong`)
        }
        res.send("User was deleted successfully")

    } catch (e) {
        res.status(500).send("Could not delete User with id" + req.params.id)
    }
}