import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';

class SearchBar extends Component {


    render() {
        return (
            <div className="searchbar">

                <br/>
                    <DebounceInput
                    value={this.props.searchTerm}
                    placeholder="Search artworks here"
                    minLength={2}
                    debounceTimeout={1000}
                    onChange={event => this.props.handleArtworkSearch(event)} />

                <br/>
            </div>
        );
    }
}

export default SearchBar;

