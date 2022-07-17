// should match with id with respective id in HTML
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];  


// show new Quote
function newQuote(){
    //pick a random Quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    
    // check if Author field is blank and replace with "Unkown"
    if(!quote.author)
    {
        authorText.textContent = 'Unkown';
    }else{
        authorText.textContent = quote.author;
    }

    // check Quote length to determine the styling
    if(quote.text.length > 120)
    {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
}


// Get Quotes form the API
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        //Catch error here
        alert(error);
    }
}

// Tweet Quote using query parameters
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes();