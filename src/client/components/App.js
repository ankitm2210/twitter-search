import React, { PropTypes } from 'react';
import Tweet from './tweetContainer/tweetContainer';

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            'tweetList':[]
        }
    }

    componentDidMount() {
      let URL = 'http://localhost:3000/services/search/Happy+anniversary';
      let _self = this;

      fetch(URL).then(function(response) {
           response.json().then(json => {
                _self.setState({
                    'tweetList': json
                });
          });
      });

   }
  render(){
   return (<div className="container">
          <Tweet tweetList={this.state.tweetList}></Tweet>
        </div>
      );
  }

}

App.propTypes = { children: PropTypes.object };

export default App;
