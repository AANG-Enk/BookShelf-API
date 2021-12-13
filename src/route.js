/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const {
  addBook, getAllBook, getBookById, editBookById, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => 'Halaman tidak dapat ditemukan',
  },
];

module.exports = routes;
