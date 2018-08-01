const chucksAPI = "https://api.icndb.com/jokes"
const quotesAPI = "https://talaikis.com/api/quotes/"
const chuckButton = document.querySelector("#randomChuck")
const unChuckButton = document.querySelector("#unChuck")
const searchChuckButton = document.querySelector("#searchChuck")
const searchUnChuckButton = document.querySelector("#searchUnChuck")
const keyWordSearch = document.querySelector("#keyWordSearch")
const chuckFactKeeper = document.querySelector("#ChuckFactKeeper")
let chuckTag = document.createElement("p")
let randomChuckFact

chucksFacts()
function chucksFacts() {
    randomQuote = Math.floor(Math.random() * 99)
    fetch(chucksAPI)
        .then(chuck => chuck.json())
        .then(chuck => chuck.value)
        .then(getRandomChuck)
        .then(appendRandomFact)
}

function getRandomChuck(chuckValue) {
    randomChuckFact = Math.floor(Math.random() * chuckValue.length)
    return chuckValue[randomChuckFact].joke
}

function appendRandomFact(randomFact) { 
    chuckFactKeeper.appendChild(chuckTag)
    chuckTag.innerHTML = randomFact
    chuckTag.setAttribute("class", "factOrQuoteTag")
}

chuckButton.addEventListener("click", newChuck)

function newChuck(event) {
    event.preventDefault()
    if (keyWordSearch.value === "") {
        chucksFacts()
    } else 
        searchChuck()
}

function searchChuck() {
    fetch(chucksAPI)
        .then(chuck => chuck.json())
        .then(chuck => chuck.value.map(value => value.joke))
        .then(jokes => jokes.filter(joke => filterStrings(joke)))
        .then(jokeFilter)
        .then(appendRandomFact)
}
function jokeFilter(filteredJokes) {
    let jokesLength = filteredJokes.length
    randomChuckFact = Math.floor(Math.random() * jokesLength)
    factReturn = filteredJokes[randomChuckFact]
    if (factReturn == undefined) {
        return "Not found please try again"
    } else 
        return factReturn
}

function filterStrings(joke) {
    let keyword = keyWordSearch.value
    return joke
        .toLowerCase()
        .includes(keyword.toLowerCase())
}

document
    .querySelector("#randomChuck")
    .addEventListener("click", playAudio)

function playAudio(event) {
    var audio = new Audio('./mp3s/Chuck Norris.mp3')
    audio.play()
}
document
    .querySelector("#unChuck")
    .addEventListener("click", playAudio2)

function playAudio2(event) {
    var audio = new Audio('./mp3s/Bozo.mp3')
    audio.play()
}

function quotesNowRequest() {
    fetch(quotesAPI)
        .then(response => response.json())
        .then(quote => quote)
        .then(getRandomQuote)
        .then(appendRandomFact)
}

function getRandomQuote(quotes) {
    let getQuote = quotes[randomQuote]
    return (getQuote.quote)
}

function quotesNow() {
    event.preventDefault()
    if (keyWordSearch.value === "") {
        quotesNowRequest()
    } else 
        searchQuotes()
}

function searchQuotes() {
    fetch(quotesAPI)
        .then(quotes => quotes.json())
        .then(quotes => quotes.map(quotes => quotes.quote))
        .then(quote => quote.filter(quote => filterStrings(quote)))
        .then(getQuote)
        .then(appendRandomFact)
}

function getQuote(quotes) {
    factReturn = quotes[0]
    if (factReturn == undefined) {
        return "Not found please try again"
    } else 
        return factReturn
}
