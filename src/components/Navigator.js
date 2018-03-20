import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import capitalize from 'capitalize';
import { fetchCategories, setCategory  } from '../actions';

class Navigator extends Component{

    componentDidMount() {
        console.log("Running again Mount");
        this.props.getCategories();
    
            this.props.setSelectedCategory("all");
      }


    render(){

        const { categories } = this.props;
        console.log(categories);
        
        const selectedCategory = categories.category;
        console.log(selectedCategory);
        

    return (<div>
      <div className="top-bar" >
        <Link to="/" >
          <div className="home-icon" > </div> </Link >
        <h1 className="title" > < Link to="/" > READABLE! </Link></h1>
      </div>

      <div className="categories">
        <h3> CATEGORIES </h3> <div className="categories-list" >

          {categories.categories !== undefined && <ul> {
            categories.categories.map(
              category =>
                (
                  (<Link to={
                    `/category/${category.name}`
                  } ><li className=
                  { ((selectedCategory === category.name) && ("selected-category"))
                  || (selectedCategory !== category.name) && ("")} key={
                    category.name
                  } >
                     {
                        capitalize.words(category.name)
                      }  </li ></Link>) 
                   
                )
            )

          }

          </ul>} </div >
      </div>


      </div>);
      };
    }

    function mapStateToProps({ categories }) {
  
        return { categories };
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