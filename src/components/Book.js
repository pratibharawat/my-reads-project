import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noCoverImage from '../icons/no-cover.png'

export default class Book extends Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render () {
    const { searchedBooks, changeShelf} = this.props;

    return (
        <div className="bookshelf-books">
        <ol className="books-grid">
            {searchedBooks.length > 0 &&
              searchedBooks.map(searchedBook => (
            <li key={searchedBook.id}>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${searchedBook.imageLinks && searchedBook.imageLinks.thumbnail ? 
                                                        searchedBook.imageLinks.thumbnail : noCoverImage}")`
                        }}
                    />
                <div className="book-shelf-changer">
                    <select
                    name="update-shelf"
                    onChange={event => changeShelf(event, searchedBook)}
                    value={searchedBook.shelf}>
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{searchedBook.title ? searchedBook.title : "No title available"}</div>
                <div className="book-authors">
                    {searchedBook.authors ? searchedBook.authors.join(",") : ""}
                </div>
                </div>
            </li>
            ))}
        </ol>
        </div>
    );
    }
}
