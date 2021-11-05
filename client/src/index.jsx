import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview.jsx';
import axios from 'axios';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItems/RelatedItemsComparison.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.findRating = this.findRating.bind(this);
    this.state = {
      rating: 0,
      num_Of_Ratings: 0,
      product_id: 0,
    }
  }

  findRating(p_id) {
    axios.get("http://localhost:3000/reviews/meta", { params: { product_id: p_id } })
      .then((data) => {
        var total = 0;
        var votes = 0;
        for (var key = 1; key <= 5; key++) {
          total += key * parseInt(data.data.ratings[key], 10);
          votes += parseInt(data.data.ratings[key], 10);
        }
        var average = Math.round(1000 * total / votes) / 1000;
        return average;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios.get("http://localhost:3000/products", { params: { path: "/products" } })
      .then((data) => {
        this.setState({
          product_id: data.data['0']['id'],
          name: data.data['0']['name'],
        });
      })
      .then(() => {
        axios.get("http://localhost:3000/reviews/meta", { params: { product_id: this.state.product_id } })
          .then((data) => {
            var total = 0;
            var votes = 0;
            for (var key = 1; key <= 5; key++) {
              total += key * parseInt(data.data.ratings[key], 10);
              votes += parseInt(data.data.ratings[key], 10);
            }
            var average = Math.round(1000 * total / votes) / 1000;
            this.setState({
              rating: average,
              num_Of_Ratings: votes,
            });
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='app-container'>
<<<<<<< HEAD
       {/*<div id='overview'><Overview product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} /></div>
        <div id='questionsAnswers'><QuestionsAnswers productName={this.state.name} id={this.state.product_id} /></div>
    <div id='relatedItems'><RelatedItemsComparison /></div>*/}
        <div id='ratingsReviews'><RatingsReviews product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} /></div>
=======
        <div id='overview'><Overview product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} /></div>
        {/* <div id='questionsAnswers'><QuestionsAnswers productName={this.state.name} id={this.state.product_id} /></div> */}
        {/* <div id='relatedItems'><RelatedItemsComparison /></div> */}
        {/* <div id='ratingsReviews'><RatingsReviews product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} /></div> */}
>>>>>>> 2e6c152ec5fc3c50a8c2ef76d7d22c8c04d8a1af
      </div>
   )
 }
}

ReactDOM.render(<App />, document.getElementById('app'));