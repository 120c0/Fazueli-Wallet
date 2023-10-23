import { createHash } from 'crypto';
const Database = require('sqlite3').Database;

export default async function handler(req, res) {
    const db = new Database(process.env.DATABASE_FILENAME, {readonly: false});
    const data = req.body;

    try {
        const sql_get_wallet = 'SELECT * FROM WALLET WHERE USERNAME = ?';
        
        const sender = await new Promise((resolve, reject) => {
            db.get(sql_get_wallet, [data.sender_username], (err, row) =>
                err ? reject(new Error(err.message)) : resolve(row));
        });
        const reciver = await new Promise((resolve, reject) => {
            db.get(sql_get_wallet, [data.reciver_username], (err, row) =>
                err ? reject(new Error(err.message)) : resolve(row));
        });
        
        if(sender.PASSWORD_SHA256_SUM === createHash('sha256').update(data.sender_password).digest('hex') && reciver.USERNAME != undefined && sender.USERNAME != undefined)
        {
            if(sender.BALANCE - data.amount >= 0) {
                db.serialize(() => {
                    const send = db.prepare('UPDATE WALLET SET BALANCE = ? WHERE USERNAME = ?');
                    
                    send.run(Number(sender.BALANCE) - Number(data.amount), data.sender_username);
                    send.run(Number(reciver.BALANCE) + Number(data.amount), data.reciver_username);
                    send.finalize();
                });
                db.close();
                return res.status(200).json({success: true});
            }
            db.close();
            return res.status(200).json({success: false});
        } else {
            db.close();
            return res.status(200).json({success: false, error: err.message});
        }
    } catch (err) {
        db.close();
        return res.status(500).json({success: false, error: err.message});
    }
}