const express   =   require('express');
const mysqlConnection  =   require('./config/mysqlConnection');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
// -----------------------------------------------------------------------------------------

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname+'/public/index.html'));

});


// -----------------------------------------------------------------------------------------
//Creating GET Router to fetch all the user details from the MySQL Database
app.get('/users' , (req, res) => {
    mysqlConnection.query('SELECT * FROM `userstest` ', (err, result, fields) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

//Router to GET ID specific user detail from the MySQL database
app.get('/users/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM `userstest` WHERE `id` = ?',[req.params.id], (err, result, fields) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

//Router to INSERT specific user detail from the MySQL database
app.post('/users' , (req, res) => {
    const   firstname   =   req.body.FirstName,
            lastname    =   req.body.LastName,
            age         =   req.body.Age

    mysqlConnection.query('INSERT INTO `userstest` (`FirstName`, `LastName`, `Age`) VALUES ( ?, ?, ?)',
    [ firstname, lastname, age],
    (err, result) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

// Router to DELETE User WHERE ID specific user detail from the MySQL database
app.delete('/users/:id' , (req, res) => {
    mysqlConnection.query(' DELETE FROM `userstest` WHERE `ID` = ? ',[req.params.id],
    (err, result) =>{
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

// Router to DELETE ALL specific user detail from the MySQL database
app.delete('/users' , (req, res) => {
    mysqlConnection.query('DELETE FROM `userstest` ',
    (err, result) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

//Router to Update specific user detail from the MySQL database
app.put('/users/:id' , (req, res) => {
    const   firstname   =   req.body.FirstName,
            lastname    =   req.body.LastName,
            age         =   req.body.Age

    mysqlConnection.query(' UPDATE `userstest` SET `FirstName` = ? , `LastName` = ? , `Age` = ? WHERE `ID` = ? ',
    [ firstname, lastname, age,req.params.id],
    (err, result) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );
