import React from 'react'
import './App.css'
import SearchPage from './components/SearchPage';
import * as BooksAPI from './BooksAPI';
import BookList from "./components/BookList";
import { Route } from 'react-router-dom';

export default class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    })
  }

  changeShelf = (event, searchedBook) => {
    const books = this.state.books;
    const shelf = event.target.value;
    searchedBook.shelf = event.target.value;
    this.setState({
      books
    });

  BooksAPI.update(searchedBook, shelf).then(() => {
    var updatedBooks = this.state.books
                        .filter(b => b.id !== searchedBook.id);
    updatedBooks.push(searchedBook);
    this.setState({books: updatedBooks});
  });
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/"
          render={() => (
            <BookList
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
}
}
