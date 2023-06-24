const fs = require('fs/promises')
const path = require('path')

class dbConnection {
  dbStore : {}[] | null
  dbURL : string
  // send specific db file path with path resolver
  constructor(filepath: string) {
    this.dbStore = null;
    this.dbURL = filepath;
  }

  // read file from specific db file
  async readFile(): Promise<void> {
    try {
      let data = await fs.readFile(this.dbURL, 'utf-8');
      this.dbStore = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  // write file on specific db file
  async writeFile(): Promise<void> {
    try {
      if (this.dbStore) {
        await fs.writeFile(this.dbURL, JSON.stringify(this.dbStore), 'utf-8');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // retrieve data from specific db file
  async getDB(): Promise<any> {
    if (this.dbStore) {
      return this.dbStore;
    }
    await this.readFile();
    return this.dbStore;
  }
}

// export dbConnection object so that it can be used for multiple db files
module.exports =  dbConnection;
