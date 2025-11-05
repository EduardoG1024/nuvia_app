// CLIENT
const supabaseClient = supabase.createClient(
    'https://uhpxxyojejihpvvrptpf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocHh4eW9qZWppaHB2dnJwdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTM3NzksImV4cCI6MjA3NjAyOTc3OX0.k3-OeYyjYSVWpv_nuUqryIW17QIdpCgZ0QEPbX7W7QM'
);
// TITLE VERIFICATION
let user = localStorage.getItem('usernameStudent');
let userNameView = document.getElementById('userNameView');
if (user != null) {
    historiaUser.innerHTML = `Escribe un tweet`;
    userNameView.textContent = user
} else {
    historiaUser.innerHTML = 'Escribe un tweet';
}
// :v
const btnSubmit = document.getElementById('btnTweet');
const saveStatus = document.getElementById('saveStatus');
// nuvia_users_tweets
// user_name
// tweet_user
// user_date
btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    // GET USER TWEET OF THE INPUT
    const userTweet = await document.getElementById('userTweet').value.trim();
    // GET DAY / MONTH / YEAR
    const publishedDay = new Date().getDate();
    const publisheMonth = new Date().getMonth() + 1;
    const publishedYear = new Date().getFullYear();
    // DATE UNION
    const publishedDate = `${publishedYear}/${publisheMonth}/${publishedDay}`;
    // HANDLE TWEET IF EXIST
    if (userTweet) {
        // SAVE USER TWEET
        const { error } = await supabaseClient
        .from('nuvia_users_tweets')
        .insert({
            user_name: user,
            tweet_user: userTweet,
            user_date: publishedDate
        })
        // HANDLE ERRORS 
        if (error) {
            saveStatus.textContent = 'Error al publicar tweet';
        } else {
            saveStatus.textContent = 'Tweet guardado';
            window.location.reload();
        }
    } else {
        saveStatus.textContent = 'Escribe un tweet';
    }
});
// TWEETS DISPLAY
const tweetsDisplay = document.querySelector('.tweets-container-display');
// SHOW TWEETS
async function showTweets() {
    const {data, error} = await supabaseClient
    .from('nuvia_users_tweets')
    .select('user_name, tweet_user, user_date')
    .order('id', {ascending:false})
    .gt('id', 5)
    if (error) {
        console.error(error);
    } else {
        data.forEach(tweetData => {
            const tweetBox = document.createElement('div');
            tweetBox.className = 'tweet-box-style';
            tweetBox.innerHTML = `
                                 <strong>@${tweetData.user_name}</strong> <br>
                                 <hr>
                                 ${tweetData.tweet_user} <br>
                                 <br>
                                 Fecha: ${tweetData.user_date}
                                 `;
            tweetsDisplay.appendChild(tweetBox);
        })
    }
}
showTweets();
// TWEETS COUNT
const tweetCount = document.querySelector('.tweets-count');
async function changeTweetCount() {
    const { data, error } = await supabaseClient
    .from('nuvia_users_tweets')
    .select('id')
    let tweetCounter = data.length - 5;
    if (!error) {
        tweetCount.innerHTML = `${tweetCounter} tweets`;
    } else {
        tweetCount.textContent = '# Tweets';
    }
}
changeTweetCount();