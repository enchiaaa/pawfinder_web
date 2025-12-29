const MAX_PAGE = 2;
const PER_PAGE = 6;
var knowledgeNowPage = 1;

let filteredKnowledge = knowledges;

const knowledgeSearchInput = document.querySelector(".knowledge .search input");
const knowledgeSelect = document.querySelector(".knowledge .search select");
knowledgeSearchInput.addEventListener("input", filterKnowledge);
knowledgeSelect.addEventListener("change", filterKnowledge);

updateKnowledges();

function filterKnowledge(){
    const keyword = knowledgeSearchInput.value.trim();    // 移除字串起始及結尾處的空白字元
    const type = knowledgeSelect.value;

    filteredKnowledge = knowledges.filter(item => {
        const matchKeyword = item.title.includes(keyword);
        const matchType = (type === "不限" || item.type.includes(type));

        return matchKeyword && matchType;
    })
    updateKnowledges();
}

function updateKnowledges() {
    const articles = document.querySelector(".knowledge .articles");

    articles.innerHTML = '';

    if (filteredKnowledge.length === 0) {
        let div = document.createElement("div");
        div.innerHTML = "查無文章";
        articles.appendChild(div);
    }

    const start = (knowledgeNowPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const pageData = filteredKnowledge.slice(start, end);

    console.log(pageData);

    pageData.forEach(item => {
        let divArticle = document.createElement("div");
        divArticle.classList = "article";

        const typeClass = {
            "行為習性": "behavior",
            "知識科普": "knowledge",
            "飲食安全": "food",
            "情緒反應": "emotion"
        }[item.type] || "";

        divArticle.innerHTML = `
            <span class="news-date">${item.date}</span>
            <span class="news-title">${item.title}</span>
            <div class="label ${typeClass}">
                <span>${item.type}</span>
            </div>
        `;

        divArticle.addEventListener("click", () => { window.open(item.url) })
        articles.appendChild(divArticle);
    });

    updateKnowledgePagination();
}

function updateKnowledgePagination() {
    const totalPage = Math.ceil(filteredKnowledge.length / PER_PAGE);
    const pagination = document.querySelector('.pagination ul');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPage; i++) {
        const li = document.createElement("li");
        li.classList = "link";
        if (i === knowledgeNowPage) li.classList.add("active");
        li.textContent = i;

        li.addEventListener("click", () => {
            knowledgeNowPage = i;
            updateKnowledges();
        });

        pagination.appendChild(li);
    }
}


// 更新頁面
const pagination = document.querySelector(".pagination");
const links = pagination.querySelectorAll(".link");
const lastPageBtn = pagination.querySelector(".lastPage")
const nextPageBtn = pagination.querySelector(".nextPage");
document.querySelector('.lastPage')
    .addEventListener("click", () => {
        if (knowledgeNowPage > 1) {
            knowledgeNowPage--;
            updateKnowledges();
        }
    });

document.querySelector('.nextPage')
    .addEventListener("click", () => {
        const totalPage = Math.ceil(filteredKnowledge.length / PER_PAGE);
        if (knowledgeNowPage < totalPage) {
            knowledgeNowPage++;
            updateKnowledges();
        }
    });

