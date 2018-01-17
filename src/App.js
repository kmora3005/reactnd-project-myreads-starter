import React from 'react'
import { Route,Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    query: ''
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      this.getAllBooks()
    })
  }

  searchBook = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState({ books:books,query:query })
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <Shelf
            books={this.state.books}
            name="Currently Reading"
            shelf="currentlyReading"
            onUpdateBook={this.updateBook}
          />
          <Shelf
            books={this.state.books}
            name="Want to Read"
            shelf="wantToRead"
            onUpdateBook={this.updateBook}
          />
          <Shelf
            books={this.state.books}
            name="Read"
            shelf="read"
            onUpdateBook={this.updateBook}
          />
              </div>
              </div>
              </div>
      )}/>
      <Route exact path='/search' render={() => (
        <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
              <input
            type='text'
            placeholder='Search books'
            value={this.state.query}
            onChange={(event) => this.searchBook(event.target.value)}
          />
              
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              <Shelf
                books={this.state.books}
                name=""
                shelf=""
                onUpdateBook={this.updateBook}
              />
              </ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
