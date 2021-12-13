/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
const { nanoid } = require('nanoid');
const books = require('./book');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload; // Struktur Data yang akan ditampilkan

  // Kondisi Apabila CLient Tidak Memasukkan Name Book
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Kondisi Apabila Client Memasukkan ReadPage lebih besar dari PageCOunt
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);// NanoId untuk memberikan ID Unicode
  const insertedAt = new Date().toISOString();// Date untuk memberikan keterangan waktu
  const updatedAt = insertedAt;// Untuk update waktu
  // Buku sudah selesai baca apabila PageCount === readPage
  const finished = (pageCount === readPage);

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);// Memasukkan nilai array kedalam array

  // Inisialisasikan Buku yang masuk dengan mengecek apakah ID buku ada tidak
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Pengkondisian apabila Buku berhasil ter-add atau aggal
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookHandler = (request, h) => {
  const {
    name, reading, finished,
  } = request.query; // Struktur Data yang akan ditampilkan

  const filterBooks = books;

  // kondisi cek saat Ambil semua Data
  if (name !== undefined) {
    filterBooks = filterBooks.filter((book) => book.name.toLowerCase().include(name.toLowerCase));
  }
  if (reading !== undefined) {
    filterBooks = filterBooks.filter((book) => book.reading === !!Number(reading));
  }
  if (finished !== undefined) {
    filterBooks = filterBooks.filter((book) => book.finished === !!Number(finished));
  }

  // Respon yang diterima apakah berhasil atau gagal
  const response = h.response({
    status: 'success',
    data: {
      books: filterBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((bk) => bk.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
};
