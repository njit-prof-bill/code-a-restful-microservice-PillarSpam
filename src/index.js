const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

var users = [];
var id = 1;

app.post('/users', (req, res) =>{
    const {name, email} = req.body;
    if (!email || !name){
        res.status(400).json({erro: "Fields required"})
    }
    else{
        const user = {id: id++, name: name, email: email}
        users.push(user);
        res.status(201).json(user);
    }
});

app.get('/users/:id', (req, res) => {
    const ident = parseInt(req.params.id);
    const user = users.find(x => x.id === ident);

    if (!user){
        return res.status(404).json({error: "User not found."});
    }
    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const ident = parseInt(req.params.id);
    const {name, email} = req.body
    const user = users.find(x => x.id === ident);

    if (!user){
        return res.status(404).json({error: "User not found."});
    }
    if (name){
        user.name = name;
    }
    if (email){
        user.email = email;
    }

    res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const ident = parseInt(req.params.id);
    const userIndex = users.findIndex(x => x.id === ident);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    res.status(204).send();
});


// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
