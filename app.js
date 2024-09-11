import React, { useState, useEffect } from 'react';
import NewsFeed from './components/NewsFeed';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

function App() {
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const
        [searchTerm, setSearchTerm] = useState('');

    const [filters, setFilters] = useState({ country: 'all', language: 'all', category: '' });

    useEffect(() => {
        const fetchArticles = async () => {
            const url = `http://localhost:3000/api/articles?search=${searchTerm}&page=${currentPage}&pageSize=10&country=${filters.country}&language=${filters.language}&category=${filters.category}`;
            const response = await axios.get(url);
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
        };

        fetchArticles();
    }, [searchTerm, currentPage, filters]);

    // ... Search, filter, and pagination logic handling based on state updates ...

    return (
        <div className="App">
            <header>
                <h1>Coffee Break News</h1>
                <SearchBar onSearch={setSearchTerm} />
                <Filters onFilterChange={setFilters} />
            </header>
            <main>
                <NewsFeed articles={articles} />
            </main>
            <footer>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </footer>
        </div>
    );
}

export default App;