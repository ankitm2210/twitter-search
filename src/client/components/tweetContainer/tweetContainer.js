import React from 'react';

class  Tweet extends React.Component {

    createMarkup(tweetHTML) {
      return {__html: tweetHTML};
    }

   renderTweet(tweetHTML,idx) {
     return (
        <div id={idx} dangerouslySetInnerHTML={this.createMarkup(tweetHTML)}></div>
     )
   }


  renderTweetFromList(tweetDataList) {
    let tweetList = [];
    for(let i in tweetDataList){
        tweetList.push(this.renderTweet(tweetDataList[i], i));
    }

    return (<div>{tweetList}</div>);
  }

  render(){
    let tweetList = this.renderTweetFromList(this.props.tweetList);
    return (
        <div className="container about">
          <h1>Tweet {this.props.count}</h1>
          <div id="tweet-container" >{tweetList}</div>
        </div>
      );
  }
}

export default Tweet;
