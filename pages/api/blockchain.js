const Database = require('sqlite3').Database;
require('dotenv').config();

export default function handler(req, res) {
    try {
        const db = new Database(process.env.DATABASE_FILENAME, {readonly: true});
        db.serialize(() => {
            db.all('SELECT * FROM WALLET', [], (err, rows) => {
                if(err)
                    return res.status(300).json({sql_error: err})
                return res.status(200).json(rows);
            })
        })
        db.close();
    } catch(err) {
        return res.status(401).json({error: 'UNKNOW_ERROR'});
    }
}
  