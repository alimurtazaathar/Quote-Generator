const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const xBtn=document.getElementById('x');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');



let apiQuotes=[];

function loading()
{
    //hidden hides or unhides an element
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete()
{
    loader.hidden=true;
    quoteContainer.hidden=false;
}
function newQuote()
{
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author)
    {
        authorText.textContent="unknow";    
    }
    else
    {
        authorText.textContent=quote.author;
    }
    //if the length is bigger than a certain value add a class to make text smaller
    if(quote.text.length>50)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');    
    }
    //when quote is set hide loader
    complete();
    quoteText.textContent=quote.text;

}
function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
newQuoteBtn.addEventListener('click',newQuote);
xBtn.addEventListener('click',tweetQuote);




async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        //using async await response is not assigned anything unil data is fetched
        const response=await fetch(apiUrl);
        apiQuotes= await response.json();
        
        newQuote();
    } catch (error) {
        
    }

}
getQuotes();
