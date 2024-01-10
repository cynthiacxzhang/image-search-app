//access key from unsplash developers api
const accessKey = "1uER0X0TcwCKRwwc5fzM_2G7837wTSaPFD67p53rEck";

//html key elements - variables
const formE1 = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1; //when to add semicolon?

//main image retrieval function
async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    //note: above url uses the weird single quotes (left top keyboard)

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    //basically copying the second div in the html for every image generated
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small //unsplash uses small image format for thumbnails;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper); //vid appends container to itself - not allowed
    })

    //incremement page button (pressing show more button)
    page++

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formE1.addEventListener("submit", async (event) => { //async event
    event.preventDefault()
    page = 1;
    await searchImages() //calling the search images function 
})


showMore.addEventListener("click", async () => {
    await searchImages() //calling the search images function 
})
