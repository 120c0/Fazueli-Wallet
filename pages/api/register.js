import { redirect } from 'next/navigation';

const { createHash } = require('crypto')
const Database = require('sqlite3').Database;

export default async function handler(req, res) {
    const db = new Database(process.env.DATABASE_FILENAME);        
    try {
        const {username, password} = req.body;
        
        await new Promise((resolve, reject) => {
            db.run(`INSERT INTO WALLET(USERNAME, PASSWORD_SHA256_SUM, BALANCE) VALUES("${username}",
                "${createHash('sha256').update(String(password)).digest('hex')}", 0.0)`, (err, row) => {
                    return err ? reject(err) : resolve(err);
                });
        });
        
        db.close();
        return res.status(200).json({success: true});
    } catch(err) {
        db.close();
        return res.status(500).json({success: false, error: err.message});
    }
}
