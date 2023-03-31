const mongoose = require ('mongoose');

const SoundSchema = new mongoose.Schema({
    
    songName:{
        type: String,
        required: [true, 'This is required'],
        minLength: [2, 'Song name must be more than 2 characters'],
        maxLength: [45, 'Song name must not exceed 45 characaters']
    },
    
    artistName : {
        type: String,
        required: [true, 'This is required'],
        minLength: [2, 'Artist name must be more than 2 characters'],
        maxLength: [45, 'Artist name must not exceed 45 characaters']
    },

    playListName : {
        type : String, 
        minLength: [2, 'Playlist name must be more than 2 characters'],
        maxLength: [45, 'Playlist name must not exceed 45 characaters']

        
    }




    
}, {timestamps: true})

const Sound = mongoose.model("Sound", SoundSchema);

module.exports = Sound;

