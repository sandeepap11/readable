import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import capitalize from 'capitalize';
import { fetchCategories, setCategory } from '../actions';

class Navigator extends Component {

  static propTypes = {
		categories: PropTypes.array.isRequired,
		category: PropTypes.string.isRequired
	}

  componentDidMount() {
    this.props.getCategories();
    this.props.setSelectedCategory("all");
  }

  render() {

    const { categories, category } = this.props;

    return (<div>
      <div className="top-bar" >
        <Link to="/" >
          <div className="home-icon" > </div> </Link >
        <h1 className="title" > < Link to="/" > READABLE! </Link></h1>
      </div>

      <div className="categories">
        <h3> CATEGORIES </h3> <div className="categories-list" >

          <ul> {
            categories.map(
              thisCategory =>
                (
                  (<Link key={thisCategory} to={`/category/${thisCategory}`}>
                    {(thisCategory === category) &&
                      <li className="selected-category">
                        {capitalize.words(thisCategory)}
                      </li >}
                    {(thisCategory !== category) &&
                      <li className=" ">
                        {capitalize.words(thisCategory)}
                      </li >}
                  </Link>)
                )
            )
          }
          </ul> </div >
      </div>
    </div>);
  };
}

function mapStateToProps({ categories }) {

  let categoryList = [], categoryValue = "";

  if (categories.categories !== undefined) {

    categoryList = categories.categories.reduce((result, category) => {
      result.push(category.name);
      return result;

    }, []);
  }

  if(categories.category !== undefined){
    categoryValue = categories.category;
  }

  return { categories: categoryList, category: categoryValue };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      dispatch(fetchCategories())
    },
    setSelectedCategory: (data) => {
      dispatch(setCategory(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);