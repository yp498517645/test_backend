const mysql = require('mysql2/promise');
async function createDatabase() {
  const connection = await mysql.createConnection({
    host: 'database-1.c1aagmo0guj6.eu-north-1.rds.amazonaws.com', // MySQL 服务器地址
    port: 3306,
    user: 'admin',
    password: 'yp15905755107',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS test_db`);
  await connection.end();
}

createDatabase()
  .then(() => console.log('创建数据库成功'))
  .catch((err) => console.error('创建数据库失败:', err));
