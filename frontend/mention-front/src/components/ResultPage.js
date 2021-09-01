import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import axios from 'axios';

const queryString = require('query-string');
function ResultPage() {
    const location = useLocation();
    const [news, setNews] = useState([])
    const keyword = queryString.parse(location.search).keyword
    const params = {
        keyword: keyword
    }
    useEffect(() => {
        axios.post('http://localhost:5000/news/', params)
        .then(response => {
            setNews(response.data.posts);
            console.log(news);

            
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (

        <>
            <div className="container">
                    {news.map(article => (
                    <div className="shadow p-3 mb-5 rounded row" key={article.uuid}>
                        <div className="col-sm-4"><img style={{width: 160, height: 160}} className="rounded float-left" src={article.thread.main_image} alt="photo"/></div>
                        <div className="col-sm-8">
                            <a href={article.url}>{article.thread.title}</a>
                            <div><QueryBuilderIcon/>{article.published}</div>
                            <div className="text-truncate">{article.text}</div>

                        </div>
                    </div>
                    ))}
            </div>
        </>
    )
}

export default ResultPage
