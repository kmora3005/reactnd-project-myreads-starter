import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

const SearchPage =(props)=> {
  const { books, query, onUpdateBook, onSearchBook } = props
  return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link className='close-search' to='/'>Close</Link>
      <div className="search-books-input-wrapper">
      <input
        type='text'
        placeholder='Search books'
        value={query}
        onChange={(event) => onSearchBook(event.target.value)}
      />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
      <Shelf
        books={books}
        name=""
        shelf=""
        onUpdateBook={onUpdateBook}
      />
      </ol>
    </div>
  </div>)
}

SearchPage.PropTypes = {
  books: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  onSearchBook: PropTypes.func.isRequired
}

export default SearchPage