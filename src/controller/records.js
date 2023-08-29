let records = [];

/** ROUTE ('/records') */
// get
// alle records anzeigen
exports.getRecords = (req, res, next) => {
    if(records.length !== 0) {
        res.status(200).json({
            message: 'Liste aller records',
            records: records
        });
    } else {
        res.status(404).json({
            message: 'Noch keine records vorhanden'
        })
    }
}

// post
// record erstellen
exports.createRecord = (req, res, next) => {
    const newRecord = {
        id: req.body.id,
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        price: req.body.price
    }
    records.push(newRecord);
    res.status(201).json({
        message: 'Record erfolgreich erstellt und hinzugefügt',
        'neues Record': newRecord
    });
}


/** ROUTE ('/records/:id') */
// get
// bestimmtes record bekommen
// wenn ('/:id') dann auch req.params.id
// wenn ('/:recordId') dann auch req.params.recordId
exports.getRecord = (req, res, next) => {
    // eingegebene recordId
    const recordId = req.params.id;
    // record.id aus vorhandenem array mit eingegebener recordID vergleichen
    const record = records.find(record => record.id === recordId);

    if(record) {
        res.status(200).json({
            message: 'Record gefunden',
            record: record
        })
    } else {
        res.status(404).send('Record liegt uns noch nicht vor')
    }
}

// put
// bestimmtes record bearbeiten
exports.updateRecord = (req, res, next) => {
    const recordId = req.params.id;
    const updateRecord = req.body;
    const recordIndex = records.findIndex(record => record.id === recordId);
    if(recordIndex !== -1) {
        records[recordIndex] = { ...records[recordIndex], ...updateRecord };
        res.status(201).json({
            message: 'Record aktualisiert',
            user: updateRecord
        })
    } else {
        res.status(404).json({
            message: 'Record nicht gefunden'
        })
    }
}

// delete
// bestimmtes record löschen
exports.deleteRecord = (req, res, next) => {
    const recordId = req.params.id;
    const record = records.find(record => record.id === recordId);

    if(record) {
        records = records.filter(record => record.id !== recordId);
        res.status(200).json({
            message: 'Record wurde erfolgreich gelöscht',
            record: record
        })
    } else {
        res.status(404).json({
            message: 'Record leider nicht gefunden'
        })
    }
}
