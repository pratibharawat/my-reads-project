import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class SearchPage extends Component {

  state = {
    query: '',
    finalBooks: []
  }

  addBookToShelf(bookSearched) {
    let ifShelf = this.props.books.filter(book => book.id === bookSearched.id);
    return ifShelf.length ? ifShelf[0].shelf : "none";
  }

  getSearchedBooks = query => {
    if (query) {
      let tempBooks = [];

      BooksAPI.search(query).then(response => {
        if (response && response.length) {
            tempBooks = response.map(bookSearched => {
            bookSearched.shelf = this.addBookToShelf(bookSearched);
            return bookSearched;
          });
          this.setState({
            finalBooks: tempBooks
          });
        } else {
          this.setState({
            finalBooks: []
          });
        }
      });
    } else {
      this.setState({
        finalBooks: [],
        query: query.trim()
      });
    }
  }

  render() {
    const { changeShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            &gt;
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={event => this.getSearchedBooks(event.target.value)}
              placeholder="Search by title or author"
              type="text"
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.finalBooks.length > 0 &&
            <Book
              searchedBooks={this.state.finalBooks}
              changeShelf={changeShelf}
            />}
        </div>
      </div>
    );
}
}
