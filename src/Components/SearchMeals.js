import React from 'react'
import { Icon } from 'react-icons-kit'
import {heart} from 'react-icons-kit/icomoon/heart'
class SearchMeals extends React.Component{
  state = {
    loading: true,
    meals: null
  }
  async componentDidUpdate(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.search}`)
    const data = await response.json()
    this.setState({loading:false, meals: data.meals})
  }

  render(){
    return(
      <div className='SearchMeals'>
        {this.state.loading || !this.state.meals ? (<div>Serching...</div>) : (

          this.state.meals.map((meal, index)=>(
            <div key={index} className='ThumbnailMeal' onClick={(event)=>{
              if(event.target.tagName !=='path' && event.target.tagName !=='svg'){
                this.props.onSelect({isOpen:true, selectedMeal: meal.idMeal})
              }}}>
              <div className='meal'>
                <div className='thumbnailMeal-image' >
                  <div><img src={meal.strMealThumb} alt="meal"/></div>
                </div>
                <div className='thumbnailMeal-title' >
                  <h3>{meal.strMeal}</h3>
                    <div onClick={()=>this.props.onFavourite(meal.idMeal)}><Icon icon={heart}/></div>
                </div>
              </div>
            </div>
          ))


          )}
      </div>
    )
  }
}
export default SearchMeals
