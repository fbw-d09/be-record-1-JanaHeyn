let users = [];

/** ROUTE ('/users')*/
// get
// alle user anzeigen
exports.getUsers = (req, res) => {
    if(users.length !== 0) {
        res.status(200).json({
            message: 'Liste aller User',
            users: users
        });
    } else {
        res.status(404).json({
            message: 'Noch keine User vorhanden'
        })
    }
}

// post
// user erstellen
exports.createUser = (req, res) => {
    const { id, firstname, lastname, email, password } = req.body;
    const newUser = { id, firstname, lastname, email, password };
    users.push(newUser);
    res.status(201).json({
        message: 'User erfolgreich erstellt und hinzugefügt',
        'neuer user': newUser
    });
}


/** ROUTE ('/users/:id') */
// get
// einen bestimmten user anzeigen
exports.getUser = (req, res) => {
    // eingegebene userId
    const userId = req.params.id;
    // user.id aus vorhandenem array mit eingegebener userID vergleichen
    const user = users.find(user => user.id === userId);

    if(user) {
        res.status(200).json({
            message: 'User gefunden',
            userInfo: user
        })
    } else {
        res.status(404).send('User nicht gefunden');
    }
}

// put
// bestimmten user bearbeiten
exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    const updateUser = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updateUser };
        res.status(201).json({
            message: 'User aktualisiert',
            user: updateUser
        })
    } else {
        res.status(404).json({
            message: 'User nicht gefunden'
        })
    }
}

// delete
// bestimmten user löschen
exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    const user = users.find(user => user.id === userId);
    if(user) {
        users = users.filter(user => user.id !== userId);
        res.status(200).json({
            message: 'User wurde erfolgreich gelöscht',
            user: user
        }) 
    } else {
        res.status(404).json({
            message: 'User nicht gefunden'
        })
    }
}
