const fs   =   require('fs/promises')
const path =  require('path')


class dbConnection {
    constructor(filepath){
        this.db = null
        this.dbURL = filepath
    }
    async readFile(){
        try {
            let data = await fs.readFile(this.dbURL)
            this.db =  await JSON.parse(data)
        } catch (error) {
            console.log(error)
        }
    }

    async writeFile(){

    }

    async getDB(){
        if(this.db){
            return this.db
        }
        await this.readFile()
        return this.db;
    }
}

module.exports = dbConnection


