import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList.jsx';
import ReviewTabs from './components/ReviewTabs.jsx';
import PhotoCarousel from './components/PhotoCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    let itemId = Number(location.pathname.split('/')[2]);

    this.state = {
      id: itemId,
      itemReviews: [],
      shopReviews: [],
      view: 'item'
    };

    this.getItemReviews = this.getItemReviews.bind(this)
    this.getShopReviews = this.getShopReviews.bind(this)
    this.changeTabView = this.changeTabView.bind(this)
  }

  getItemReviews() {
    $.get(`/api/item-reviews/${this.state.id}`)
      .done((reviews) => {
        this.setState({ itemReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  getShopReviews() {
    $.get(`/api/store-reviews/${this.state.id}`)
      .done((reviews) => {
        this.setState({ shopReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  changeTabView(e) {
    var view = e.target.id === 'item-button' ? 'item' : 'shop';
    this.setState({ view });
  }

  componentDidMount() {
    this.getItemReviews()
    this.getShopReviews()
  }

  render() {
    return (
      <div>
        <ReviewTabs
          itemCount={this.state.itemReviews.length}
          shopCount={this.state.shopReviews.length}
          changeTabView={this.changeTabView}/>
        <ReviewList reviews={this.state.view === 'item' ? this.state.itemReviews : this.state.shopReviews}/>
        <PhotoCarousel />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'))
