
const { v4 } = require('uuid');
const {saveGube}=require('../controllers/database')



class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4(),
            this.name = name || "NoName",
            this.description = description,
            this.imageUrl = imageUrl || "placeholder",
            this.difficulty = difficulty || 0
    }

    save() {
        const NEWCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        } 
        
        saveGube(NEWCube)
    }

    
}

module.exports = Cube