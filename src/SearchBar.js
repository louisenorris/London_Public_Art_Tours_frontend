import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DebounceInput} from 'react-debounce-input';
// import { debounce } from "debounce";

class SearchBar extends Component {

    // state = {
    //     value: ""
    // }

    // componentDidUpdate(prevState) {
    //     // debugger
    //     if (this.state.value !== prevState) {
    //     debounce(this.props.handleArtworkSearch(this.state.value), 3000)
    // //     }
    // // }
    // handleChange = (event) => {
    //     this.setState({value: event.target.value})
    // }


    render() {
        return (
            <div className="searchbar">
                 {/* <input className="search" value={this.props.searchTerm} onChange={(e) => this.props.handleArtworkSearch(e)} /> */}
                {/* <input type="text" value={this.props.searchTerm} onChange={this.handleChange}/> */}
            {/* </div>

            <div> */}
            <br/>
                <DebounceInput
                value={this.props.searchTerm}
                placeholder="search here"
                minLength={2}
                debounceTimeout={1000}
                onChange={event => this.props.handleArtworkSearch(event)} />

            {/* <p>Value: {this.state.value}</p> */}
            </div>

            // <div className="searchbar">
            //  <br/>
            //    <form className="searchbar" onSubmit={(e) => this.props.handleArtworkSearch(e)}>
            //       <input type="text" value={this.state.value} onChange={this.handleChange} className="search"/>
            //       <button className="search" type="submit">Search</button>
            //   </form>
            //   <button className="search" onClick={this.props.showAllArtworks}>Show all artworks</button>
            // </div>
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


