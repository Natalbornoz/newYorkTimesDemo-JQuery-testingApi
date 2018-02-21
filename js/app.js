const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');
let searchedForText;


$form.submit(function (e) {
    e.preventDefault();
    $responseContainer.html('');
    searchedForText = $searchField.val();
    getNews();
});

function getNews() {
    $.ajax({
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=7e800d63f5274315aa1d72ff1d2967cd`
    }).done(addNews)
    .fail(handleError);
}

function addNews(news){
    // console.log(news);
    const articles = news.response.docs;

    articles.forEach(function(article) {
        const title = article.headline.main;
        const snippet = article.snippet;

        let $li = $('<li/>').addClass('articleClass').text(title);

        $responseContainer.append($li);
    });
}

function handleError() {
    console.log('Se ha presentado un error');
}

