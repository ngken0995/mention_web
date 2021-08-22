import React, { useState, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


function SearchBar() {
    const [keyword, setKeyword] = useState('')
    let history = useHistory();

    const SearchBtn = () => {
        history.push({
            pathname: '/result',
            search: `?keyword=${keyword}`,
            state: { detail: 'some_value' }
        });
    }
    return (
        <div>
            <form>
                <div className = "col-sm-6 mt-4">
                    <input type = "text" required className = "form-control" id="keyword" placeholder = "Search"
                    value = {keyword} onChange = {e => setKeyword(e.target.value)}
                    />
                </div>

                <div className = "col-sm-4 mt-2">
                    <button type="button" className = "btn btn-primary" onClick = {SearchBtn}>Submit</button>
                </div>
                </form>
        </div>

    )
}

export default SearchBar
