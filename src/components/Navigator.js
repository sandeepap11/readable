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

        const { categories, category } = this.props;

        console.log("render", Object.values(categories));
        
        

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
                  (<Link key={ thisCategory } to={
                    `/category/${thisCategory}`
                  } ><li className=
                  { ((thisCategory === category) && ("selected-category"))
                  || (thisCategory !== category) && ("") 
                  } >
                     {
                        capitalize.words(thisCategory)
                      }  </li ></Link>) 
                   
                )
            )

          }

          </ul> </div >
      </div>


      </div>);
      };
    }

    function mapStateToProps({ categories }) {
       
        let categoryList = [];

        if(categories.categories !== undefined){
        console.group("From map state", categories);

        categoryList = categories.categories.reduce((result, category) => {
            result.push (category.name);
            return result;

        } , []);}
        
        console.groupEnd({ categories: categoryList, category: categories.category});
        return { categories: categoryList, category: categories.category};
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