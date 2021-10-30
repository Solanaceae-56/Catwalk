import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview.jsx';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItemsComparison.jsx';
//import  from 'react-hook';

class App extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {
    return (
      <div className='app-container'>
        {/* <div id='overview'><Overview /></div> */}
        <div id='ratingsReviews'><RatingsReviews /></div>
        <div id='questionsAnswers'><QuestionsAnswers /></div>
        <div id='relatedItems'><RelatedItemsComparison /></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));