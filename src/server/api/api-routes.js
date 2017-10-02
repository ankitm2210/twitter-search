import express from 'express';
import SearchTweetAPI from './search-tweet';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

/**
* Handling '/search' url to search tweet based on search string
* URL params-
*   searchString: string to search tweets
**/
/*router.get('/search/:searchString', function (req, res) {
   try {
       SearchTweetAPI.searchTweets(req.params.searchString).then(data=>{
                 res.send(data);
             }).catch(err=>{
                 console.log(err);
                 res.send(data);
             });
   }catch(err) {
        console.log('ERROR: '+err);
   }

});*/

router.get('/search/:searchString', function (req, res) {
    try {
        SearchTweetAPI.searchTweets(req.params.searchString).then(data=>{
                  res.send(data);
              }).catch(err=>{
                  console.log(err);
                  res.send(data);
              });
    }catch(err) {
         console.log('ERROR: '+err);
    }
 
 });

router.post('/search',function(req,res){
    try{
        console.log(req.body);
        SearchTweetAPI.searchTweetsForGivenSearchIds(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            console.log(err);
            res.send(data);
        });
    }catch(err){
        console.log('ERROR: '+err)
    }
});

module.exports = router;