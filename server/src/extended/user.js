const Joi = require('joi'); //require joi for input validation
const jwt = require('./jwt.js');

const userRegistrations = require('./data/userReg.js');

//User endpoints

module.exports = {
    postUserRegistration: (req, res) => {
        const username = userRegistrations.find(usern => usern.username === req.body.username);
 
        const registration = 
        {
            id: userRegistrations[userRegistrations.length -1].id + 1,
            username: req.body.username,
            password: req.body.password
        }

        const { error } = validateUser(req.body); //<=>result.error, OBJECT DESTRUCTURING
        if(req.body.username == "" || req.body.password == ""){
            // 400 Bad Request
            return res
                .status(400)
                .header('Error', 'Invalid username/password supplied.')
                .end();
        }
        else if(req.body.username == "" && req.body.password == ""){
            // 400 Bad Request
            return res
                .status(400)
                .header('Error', 'Username and password fields cannot be left empty.')
                .end();
        }
        else{
            //Create token
            const jwtoken = jwt.jwtoken(
                "testtesttest",
                registration.id
            );
            console.log(jwtoken);
            userRegistrations.push(registration); //push new object in array
            res
                .status(200)
                .header('Authorization', 'Bearer ' + jwtoken)
                .end();
        }
    },

    postUserLogin: (req, res) => {
        //const { error } = validateUser(req.body); //<=>result.error, OBJECT DESTRUCTURING
        
        const username = userRegistrations.find(usern => usern.username === req.body.username);
        const password = userRegistrations.find(passwd => passwd.password === req.body.password);
        const indexUser = userRegistrations.findIndex((ind => ind.username === req.body.username));
        const idUser = userRegistrations[indexUser].id;

        if(username == "" || (!username)) {
            return res
                .status(404)
                .header('Error', 'No account registered with this username or field was left empty.')// return 404 object not found
                .end();//exit function if no auction
        }
        else if(password == ""){
            // 400 Bad Request
            return res
                .status(404)
                .header('Error', 'Invalid password supplied.')
                .end();
        }
        else if((username == "" && password == "")){
            // 400 Bad Request
            return res
                .status(404)
                .header('Error', 'Username and password fields cannot be left empty.')
                .end();
        }
        else if(username && password){
            const jwtoken = jwt.jwtoken(
                "testtesttest",
                idUser
            );
            console.log(jwtoken);
            res
                .status(200)
                .header('Authorization', 'Bearer ' + jwtoken)
                .end();
            return;
        }
    }
};

//-------------OBJECT DESTRUCTURING && ERROR HANDLING------------------

function validateUser(userRegistration){
    const schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(8).required()
    };

    return Joi.validate(userRegistration, schema);
}