function bindEvent() {
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

var nowPage = 1;
updateDogs();

function updateDogs() {
    const cards = document.querySelector(".cards");

    cards.innerHTML = '';
    for (var i = 0; i < dogs.length; i++) {
        let index = i;

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.includes(dogs[index].id)) {
            let divCard = document.createElement("div");
            divCard.classList = "card";
            divCard.dataset.id = dogs[index].id;

            let divHeart = document.createElement("div");
            divHeart.classList = "icon-heart";
            divHeart.innerHTML = `<span class="icon-heart-true"></span>`;
            
            let heart = divHeart.querySelector(".icon-heart span");
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
                updateDogs();
            });

            let img = document.createElement("img");
            img.src = dogs[index].image;

            let divContent = document.createElement("div");
            divContent.classList = "content";
            let url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(dogs[index].location);

            divContent.innerHTML = `
            <span style="font-size:1.2rem; font-weight:500;">${dogs[index].name}</span>
            <span>位置：${dogs[index].location}</span>
            <span>連絡電話：${dogs[index].phone}</span>
            <span>${dogs[index].id}</span>
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
}