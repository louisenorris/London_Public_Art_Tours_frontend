import React, { Component } from 'react';

class SearchBar extends Component {

    state = {
        value: ""
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }


    render() {
        return (
            <div>
                  <form onSubmit={(e) => this.props.handleArtworkSearch(e)}>
                     <input type="text" value={this.state.value} onChange={this.handleChange}/>
                     <button type="submit">Search</button>
                 </form>
                 <button onClick={this.props.showAllArtworks}>Show all artworks</button>
         </div>
        );
    }
}

export default SearchBar;


// import React from 'react';

// const SearchBar = (props) => {
//     return (
//         <div>
//             <label>
//                 <strong>Search artworks:</strong>
//                  <form onSubmit={(event) => props.handleArtworkSearch(event)}>
//                     <input type="text" defaultValue={props.searchTerm} placeholder="Search by artwork or artist..." />
//                     <button type="submit">Search</button>
//                 </form>
//             </label>
//         </div>
//     );
// };

// export default SearchBar;


