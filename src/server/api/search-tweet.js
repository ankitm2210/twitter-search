import Twit from 'twit';
import TWEET_API_CONFIG from './config/tweet-api-config';
import GetTweetHTML from './get-tweet-html';

const T = new Twit(TWEET_API_CONFIG);

const prepareTweetUrl = (username, tweetId)=> {
    return 'https://twitter.com/' + username + '/status/' + tweetId;
}


const searchTweets = (searchStr) => {
    return new Promise((resolve, reject)=>{
        T.get('search/tweets', { q: searchStr, count: 10 }, function(err, data, response) {
            console.log(data);
            if(err) {
                reject(err);
            }
            let statuses = data.statuses, tweetHTMLPromises =[];
            for(let idx in statuses) {
                let tweetPromise = GetTweetHTML.getTweetHTMLFromURL(prepareTweetUrl(statuses[idx].user.screen_name, statuses[idx].id_str));
                tweetHTMLPromises.push(tweetPromise);
            }

            Promise.all(tweetHTMLPromises).then(data=>{
                let tweetList = [];
                if(data.length) {
                    for(let i in data) {
                        tweetList.push(JSON.parse(data[i]).html);
                    }
                }
                resolve(tweetList);
            })

        });
    })
}

export default {searchTweets};




