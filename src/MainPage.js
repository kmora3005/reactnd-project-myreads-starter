import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

const MainPage =(props)=> {
  const { books, onUpdateBook } = props
  return (<div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
      <Shelf
        books={books}
        name="Currently Reading"
        shelf="currentlyReading"
        onUpdateBook={onUpdateBook}
      />
      <Shelf
        books={books}
        name="Want to Read"
        shelf="wantToRead"
        onUpdateBook={onUpdateBook}
      />
      <Shelf
        books={books}
        name="Read"
        shelf="read"
        onUpdateBook={onUpdateBook}
      />
      </div>
    </div>
    <div className="open-search">
      <Link to='/search'>Add a book</Link>
    </div>
  </div>)
}

MainPage.PropTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
}

export default MainPage