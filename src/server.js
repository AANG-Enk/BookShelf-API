/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// console.log("Tugas Submission Dicoding");

// Inisialisasikan @Hapi
const Hapi = require('@hapi/hapi');

// Insialisasikan Route
const routes = require('./route');

const init = async () => { // Server menggunakan Asyncrone
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  server.route(routes);// Memanggil Route

  await server.start();
  console.log(`Server sedang berjalan di ${server.info.uri}`);
};

init();