import Twit from 'twit';
import TWEET_API_CONFIG from './config/tweet-api-config';
import GetTweetHTML from './get-tweet-html';

const T = new Twit(TWEET_API_CONFIG);

const prepareTweetUrl = (username, tweetId)=> {
    return 'https://twitter.com/' + username + '/status/' + tweetId;
}


/*const searchTweets = (searchStr) => {
    return new Promise((resolve, reject)=>{
        T.get('search/tweets', { q: searchStr, count: 10 }, function(err, data, response) {
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
}*/

const searchTweets = (searchStr) => {
    return new Promise((resolve, reject)=>{
        T.get('search/tweets', { q: searchStr, count: 50 }, function(err, data, response) {
            if(err) {
                reject(err);
            }
            let statuses = data.statuses,tweetsPromise={}, tweetList =[],tweetHTMLPromises =[],count=0;
          
                console.log(statuses.length);
                if(statuses.length) {
                    for(let i in statuses) {
                        let screen_name = statuses[i].user.screen_name;
                        let id_str=  statuses[i].id_str;
                        
                        if(count < 10){       
                            let tweetPromise = GetTweetHTML.getTweetHTMLFromURL(prepareTweetUrl(screen_name, id_str));
                            tweetHTMLPromises.push(tweetPromise);
                            count++;
                        }

                        tweetList.push(prepareTweetObj(screen_name,id_str));
                    }
                }
               


            Promise.all(tweetHTMLPromises).then(data=>{
                let reponseObj = {
                    totalTweetList: tweetList,
                    topTenTweetHTML: data
                }
                resolve(reponseObj);
            })
        });
    })
}

const searchTweetsForGivenSearchIds = (request) => {
    return new Promise((resolve, reject)=>{
        let tweetHTMLPromises =[];
        for(let idx in request) {
            console.log[request[idx]]
            let tweetPromise = GetTweetHTML.getTweetHTMLFromURL(prepareTweetUrl(request[idx].screen_name, request[idx].id_str));
            tweetHTMLPromises.push(tweetPromise);
        }
            Promise.all(tweetHTMLPromises).then(data=>{
            let tweetList = [];
            if(data.length) {
                for(let i in data) {
                    console.log[data[i]]
                    tweetList.push(JSON.parse(data[i]).html);
                }
            }
            resolve(tweetList);
            })
    });
}

const prepareTweetObj= (screen_name,id_str)=>{
    console.log(screen_name);
    let tweet ={
        screen_name:screen_name,
        id_str:id_str
    };
    return tweet;
}


export default {searchTweets,
                searchTweetsForGivenSearchIds};





