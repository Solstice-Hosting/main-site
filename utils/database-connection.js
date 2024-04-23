const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '37.27.40.46',
    user: 'solstice1_mainSite',
    password: '6DbFr+Lv-uHOkI63',
    database: 'solstice1_mainsite',
    waitForConnections: true,
    connectionLimit: 10, // You can adjust the connection limit as needed
});

function query(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(query, params, (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}

module.exports = { query };
