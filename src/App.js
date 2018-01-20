import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    foundBooks:[],
    query: ''
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
      this.updateShelf(this.state.foundBooks)
    })
  }

  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      this.getAllBooks()
    })
  }

  updateShelf(books){
    for (let book of books){
      let foundBook=this.state.books.find(element=>element.id===book.id)
      if (foundBook){
        book.shelf= foundBook.shelf;
      }
      else {
        book.shelf='none'
      }
    }
    this.setState({ foundBooks:books })
  }

  searchBook = (query) => {
    this.setState({ query:query })
    if (query){
      BooksAPI.search(query).then((books) => {
        if (!books.error){
          this.updateShelf(books)
        }
        else {
          this.setState({ foundBooks:[] })
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
        <MainPage books={this.state.books} onUpdateBook={this.updateBook} />
      )}/>
      <Route exact path='/search' render={() => (
        <SearchPage books={this.state.foundBooks} query={this.state.query} onUpdateBook={this.updateBook} onSearchBook={this.searchBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
