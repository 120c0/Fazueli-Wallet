import { createHash } from 'crypto';

const Database = require('sqlite3').Database;

export default async function handler(req, res) {
    const db = new Database(process.env.DATABASE_FILENAME, {readonly: true});
    try {
        const sql = 'SELECT * FROM WALLET WHERE USERNAME = ?';
        const data = req.body;
        
        const user = await new Promise((resolve, reject) => db.get(sql, [data.username], (err, row) =>
            err ? reject(new Error(err.message)) : resolve(row)));

        if(createHash('sha256').update(data.password).digest('hex') === user.PASSWORD_SHA256_SUM) {
            db.close();
            return res.status(200).json(user);
        } else {
            db.close();
            return res.status(400).json({success: false, error: err.message});
        }
    } catch(err) {
        db.close();
        return res.status(500).json({success: false, error: err.message})
    }
}
