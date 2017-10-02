import request from 'request';
const TWITTER_OMBED_URL =  'https://publish.twitter.com/oembed?url=';

const getTweetHTMLFromURL = (tweetUrl)=>{

    return new Promise((resolve, reject)=>{
        request(TWITTER_OMBED_URL+tweetUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
                resolve(body);
          }
          reject(error)
        })
    });
}

export default {
    getTweetHTMLFromURL
};