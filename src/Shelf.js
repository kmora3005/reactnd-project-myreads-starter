import React from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

const Shelf = (props)=> {
  const { books, name, shelf, onUpdateBook } = props
  let booksInShelf=[]
  if (books){
    booksInShelf= books.filter((book) => (shelf==='')||book.shelf===shelf)
    booksInShelf.sort(sortBy('title'))
  }
  
  return (
  <div className="bookshelf">
  <h2 className="bookshelf-title">{name}</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
    {booksInShelf.map((book) => (
        <li key={book.id}>
        <div  className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail:'http://via.placeholder.com/128x193?text=No%20Cover'})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => onUpdateBook(book,event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    ))}
    </ol>
  </div>
  </div>
  )
}

Shelf.PropTypes = {
  books: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  onUpdateBook: PropTypes.func.isRequired
}

export default Shelf