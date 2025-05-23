const express = require('express');
let bodyParser = require('body-parser')
//Create an express instance
const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.post('/ldaplogin', (req, res) => {
    let accessCode = '88888';
    if (accessCode == req.body.password) {
        let successResponse = {
            "tokenSuccess": "true",
            "migrationRequired": "true"
        };
        console.log("Success Response: ", successResponse);
        res.status(200).send(successResponse);
    } else {
        let errorResponse = {
            "version": "1.0",
            "status": 409,
            "code": "errorCode",
            "requestId": "requestId",
            "userMessage": "The password you entered is incorrect. Please try again.",
            "developerMessage": `The provided password ${req.body.password} does not match the expected code for user.`,
            "moreInfo": "https://learn.microsoft.com/en-us/azure/active-directory-b2c/string-transformations"
        };
        console.log("Error Response: ", errorResponse);
        res.status(409).send(errorResponse);
    }
});

app.listen(3001, () => {
    console.log(`LDAP Login service listening on port !` + 3001);
});