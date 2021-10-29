import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItemsComparison.jsx';
import  from 'react-hook';

class App extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {
    return (
      <div>
        <div><Overview /></div>
        <div><RatingsReviews /></div>
        <div><QuestionsAnswers /></div>
        <div><RelatedItemsComparison /></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));