import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';

class SearchBar extends Component {


    render() {
        return (
            <div>

                <br/>
                    <DebounceInput
                    value={this.props.searchTerm}
                    placeholder="Search by artwork or artist..."
                    minLength={2}
                    debounceTimeout={1000}
                    onChange={event => this.props.handleArtworkSearch(event)} 
                    className="searchbar"
                    />
                <br/>
                <br/>
            </div>
        );
    }
}

export default SearchBar;

