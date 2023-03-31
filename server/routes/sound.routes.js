const Sound = require('../controllers/Sound.controller');

module.exports = (app) => {
    app.post('/api/Sounds', Sound.createSound)
    app.get('/api/getAll', Sound.allSounds)
    app.get('/api/selectOneSound/:id', Sound.getOneSound)
    app.put('/api/updateSound/:id', Sound.updateSound)
    app.delete('/api/deleteSound/:id', Sound.deleteSound)

}