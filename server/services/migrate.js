migrate.js

import relationalDb from './mysql/db.service.js'
import mongoDb from './mongo/db.service.js'

export async function migrateDatabase(){
    console.log('inside migrate function')
    const users = await relationalDb.executeQuery('Select * from user;')
    console.log('after query')
    console.log('users', users)
    return users
}
