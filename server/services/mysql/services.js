import db from './db.service.js'

async function createTest(data){
    const query = 'INSERT INTO test (firstname, lastname, email) VALUES (?, ?, ?)';
    const params = [data.firstname, data.lastname, data.email]
    
    return await db.executeQuery(query, params);
}

async function getTest(){
    const query = 'SELECT * FROM test';
    return await db.executeQuery(query);
}

export default { createTest, getTest }