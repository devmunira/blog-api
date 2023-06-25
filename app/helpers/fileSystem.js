import fs from 'fs/promises'
import path from 'path'

class dbConnection {
  // send specific db file path with path resolver
  constructor(filepath) {
    this.dbStore = null;
    this.dbURL = filepath;
  }

  // read file from specific db file
  async readFile() {
    try {
      let data = await fs.readFile(this.dbURL, 'utf-8');
      this.dbStore = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  // write file on specific db file
  async writeFile() {
    try {
      if (this.dbStore) {
        await fs.writeFile(this.dbURL, JSON.stringify(this.dbStore), 'utf-8');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // retrieve data from specific db file
  async getDB(){
    if (this.dbStore) {
      return this.dbStore;
    }
    await this.readFile();
    return this.dbStore;
  }
}

// export dbConnection object so that it can be used for multiple db files
export default dbConnection;