const MAX_PAGE = 2;
var dogsNowPage = 1;
var sheltersNowPage = 1;

updateDogs();

function bindEvent(){
    const hearts = document.querySelectorAll(".icon-heart span");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            if (heart.className == "icon-heart-false") {
                heart.className = "icon-heart-true";
            }
            else heart.className = "icon-heart-false";
        })

        const card = heart.closest(".card");
        const dogId = card.dataset.id;

        if (favorites.includes(dogId)) {
            heart.classList.remove("icon-heart-false");
            heart.classList.add("icon-heart-true");
        }

        heart.addEventListener("click", () => {

            if (favorites.includes(dogId)) {
                favorites = favorites.filter(id => id !== dogId);
                heart.classList.remove("icon-heart-true");
                heart.classList.add("icon-heart-false");
            } else {
                favorites.push(dogId);
                heart.classList.remove("icon-heart-false");
                heart.classList.add("icon-heart-true");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}

// 更新頁面
const paginations = document.querySelectorAll(".pagination");

paginations.forEach(pagination => {
    const target = pagination.dataset.target;
    const links = pagination.querySelectorAll(".link");
    const lastPageBtn = pagination.querySelector(".lastPage")
    const nextPageBtn = pagination.querySelector(".nextPage");
    
    if(target == "dogs_info"){
        links.forEach(link => {
            link.addEventListener("click", ()=>{
                links.forEach(link => { link.classList.remove("active"); });
                dogsNowPage = link.value;
                links[dogsNowPage - 1].classList.add("active");
                updateDogs();
            })
        })
        lastPageBtn.addEventListener("click", ()=>{
            links.forEach(link => { link.classList.remove("active"); });
            dogsNowPage = dogsNowPage - 1;
            if(dogsNowPage < 1) dogsNowPage = 1; 
            links[dogsNowPage - 1].classList.add("active");
            updateDogs();
        })
        nextPageBtn.addEventListener("click", () => {
            links.forEach(link => { link.classList.remove("active"); });
            dogsNowPage = dogsNowPage + 1;
            if (dogsNowPage > MAX_PAGE) dogsNowPage = MAX_PAGE;
            links[dogsNowPage - 1].classList.add("active");
            updateDogs();
        })
    }
    else if(target == "shelter_info"){
        links.forEach(link => {
            link.addEventListener("click", () => {
                links.forEach(link => { link.classList.remove("active"); });
                sheltersNowPage = link.value;
                links[sheltersNowPage - 1].classList.add("active");
                updateShelters();
            })
        })
        lastPageBtn.addEventListener("click", () => {
            links.forEach(link => { link.classList.remove("active"); });
            sheltersNowPage = sheltersNowPage - 1;
            if (sheltersNowPage < 1) sheltersNowPage = 1;
            links[sheltersNowPage - 1].classList.add("active");
            updateShelters();
        })
        nextPageBtn.addEventListener("click", () => {
            links.forEach(link => { link.classList.remove("active"); });
            sheltersNowPage = sheltersNowPage + 1;
            if (sheltersNowPage > MAX_PAGE) sheltersNowPage = MAX_PAGE;
            links[sheltersNowPage - 1].classList.add("active");
            updateShelters();
        })
    }
})

function updateDogs() {
    const cards = document.querySelector(".dogs_info .cards");
    cards.innerHTML = '';
    for (var i = 0; i < 6; i++) {
        let index = 6 * (dogsNowPage - 1) + i;

        let divCard = document.createElement("div");
        divCard.classList = "card";
        divCard.dataset.id = dogs[index].id;

        let divHeart = document.createElement("div");
        divHeart.classList = "icon-heart";
        divHeart.innerHTML = `<span class="icon-heart-false"></span>`;
        let heart = divHeart.querySelector(".icon-heart span");

        // 初始化愛心狀態
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.includes(dogs[index].id)) {
            heart.classList.remove("icon-heart-false");
            heart.classList.add("icon-heart-true");
        }

        heart.addEventListener("click", () => {
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const dogId = divCard.dataset.id;

            if (favorites.includes(dogId)) {
                favorites = favorites.filter(id => id !== dogId);
                heart.classList.remove("icon-heart-true");
                heart.classList.add("icon-heart-false");
            } else {
                favorites.push(dogId);
                heart.classList.remove("icon-heart-false");
                heart.classList.add("icon-heart-true");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });

        let img = document.createElement("img");
        img.src = dogs[index].image;

        let divContent = document.createElement("div");
        divContent.classList = "content";

        let url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(dogs[index].location);

        divContent.innerHTML = `
            <span style="font-size:var(--fs-base); font-weight:500; ">${dogs[index].name}</span>
            <span>位置：${dogs[index].location}</span>
            <span>連絡電話：${dogs[index].phone}</span>
            <span>編號：${dogs[index].id}</span>
            <div class="icons">
                <div class="icon" data-tooltip="複製電話"><span class="icon-phone"></span></div>
                <div class="icon" data-tooltip="查詢地址"><a style="text-decoration: none;" href="${url}" target="_blank"><span class="icon-map-marker"></span></a></div>
            </div>
        `;

        divCard.appendChild(divHeart);
        divCard.appendChild(img);
        divCard.appendChild(divContent);
        cards.appendChild(divCard);
    }
}


let filteredShelters = shelters;

const shelterSearchInput = document.querySelector(".shelter .search input");
const shelterSelect = document.querySelector(".shelter .search select");

shelterSearchInput.addEventListener("input", filterShelters);
shelterSelect.addEventListener("change", filterShelters);

updateShelters();

function filterShelters() {
    const keyword = shelterSearchInput.value.trim();    // 移除字串起始及結尾處的空白字元
    const area = shelterSelect.value;

    filteredShelters = shelters.filter(item => {
        const matchKeyword =
            item.name.includes(keyword) ||
            item.address.includes(keyword) ||
            item.phone.includes(keyword);

        const matchArea = (area === "不限" || item.address.includes(area));

        return matchKeyword && matchArea;
    });
    updateShelters();
}

function updateShelters(){
    const cards = document.querySelector(".shelter_info .info .shelter .cards");
    cards.innerHTML = '';

    if (filteredShelters.length === 0){
        let div = document.createElement("div");
        div.innerHTML = "暫無資料";
        cards.appendChild(div);
    }

    filteredShelters.forEach(item => {
        let divCard = document.createElement("div");
        divCard.classList = "card";

        let url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(item.name);

        divCard.innerHTML = `
                <span style="font-size:var(--fs-lg); font-weight:500;">${item.name}</span>
                <span>地址：${item.address}</span>
                <span>聯絡電話：${item.phone}</span>
                <span>營業時間：${item.time}</span>
                <div class="icons" style="align-self: flex-end; margin-right: 1rem;">
                    <div class="icon" data-tooltip="複製電話"><span class="icon-phone"></span></div>
                    <div class="icon" data-tooltip="查詢地址"><a style="text-decoration: none;" href="${url}" target="_blank"><span class="icon-map-marker"></span></a></div>
                </div>
            `;
    
        cards.appendChild(divCard);
    });
}