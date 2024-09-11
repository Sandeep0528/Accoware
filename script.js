const apiKey = 'YOUR_GNEWS_API_KEY'; // Replace with your API key
let currentPage = 1;
let pageSize = 10;

function getArticles(searchTerm = '', page = currentPage) {
    const url = `http://localhost:3000/api/articles?search=${searchTerm}&page=${page}&pageSize=${pageSize}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            currentPage = page;
            updateNewsFeed(articles);
            updatePagination(data.totalPages);
        })
        .catch(error => console.error(error));
}

function updateNewsFeed(articles) {
    const newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = ''; // Clear existing articles
    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
      <img src="${article.img}" alt="News Image">
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;
        newsFeed.appendChild(articleElement);
    });
}

function updatePagination(totalPages) {
    const currentPageDisplay = document.getElementById('current-page');
    currentPageDisplay.textContent = `Page ${currentPage}`;

    const prevButton = document.querySelector('nav button:first-child');
    const nextButton = document.querySelector('nav button:last-child');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function getNextPage() {
    getArticles('', currentPage + 1);
}

function getPreviousPage() {
    getArticles('', currentPage - 1);
}

function getArticlesByCategory(category) {
    getArticles(category);
}

document.getElementById('search').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        getArticles(this.value);
    }
});

getArticles(); // Get initial articles on page load