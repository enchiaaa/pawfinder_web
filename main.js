const MAX_PAGE = 2;
var newsPage = 1;

updateNews();

// 更新頁面
const pagination = document.querySelector(".pagination");
const links = pagination.querySelectorAll(".link");
const lastPageBtn = pagination.querySelector(".lastPage")
const nextPageBtn = pagination.querySelector(".nextPage");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(link => { link.classList.remove("active"); });
        newsPage = link.value;
        links[newsPage - 1].classList.add("active");
        updateNews();
    })
})
lastPageBtn.addEventListener("click", () => {
    links.forEach(link => { link.classList.remove("active"); });
    newsPage = newsPage - 1;
    if (newsPage < 1) newsPage = 1;
    links[newsPage - 1].classList.add("active");
    updateNews();
})
nextPageBtn.addEventListener("click", () => {
    links.forEach(link => { link.classList.remove("active"); });
    newsPage = newsPage + 1;
    if (newsPage > MAX_PAGE) newsPage = MAX_PAGE;
    links[newsPage - 1].classList.add("active");
    updateNews();
})

function updateNews() {
    const articles = document.querySelector(".articles");
    articles.innerHTML = '';

    for (var i = 0; i < 6; i++) {
        let index = 6 * (newsPage - 1) + i;

        let divArticle = document.createElement("div");
        divArticle.classList = "article";
        divArticle.dataset.id = news[index].id;

        divArticle.addEventListener("click", () => {
            openModal(news[index]);
        });

        divArticle.innerHTML = `
            <span class="news-date">${news[index].date}</span>
            <span class="news-title">${news[index].title}</span>
        `;

        articles.appendChild(divArticle);
    }
}

const modal = document.getElementById("articleModal");
const modalTitle = modal.querySelector(".modal-title");
const modalPublisherAndTime = modal.querySelector(".modal-publisher-time");
const modalBody = modal.querySelector(".modal-body");
const modalClose = modal.querySelector(".close");

function openModal(article) {
    modalTitle.textContent = article.title;
    modalPublisherAndTime.textContent = article.publisher + "　　" + article.date;
    modalBody.innerHTML = '';
    article.content.forEach(paragraph => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        modalBody.style.textAlign = "left";
        modalBody.appendChild(p);
    });
    modal.style.display = "flex";
}

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    pageDots: true,
});

const images = document.querySelectorAll(".carousel-cell img");

flkty.on('select', function (index) {
    console.log(images)
    images.forEach(image => {
        image.classList.remove("is-selected");
    });
    images[index].classList.add("is-selected");
});

