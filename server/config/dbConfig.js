module.exports = {
  HOST: "localhost",
  USER: "din",
  PASSWORD: "tsud2bsp",
  DB: "girbas",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
