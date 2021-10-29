import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItems/RelatedItemsComparison.jsx';

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