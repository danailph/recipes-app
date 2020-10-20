import React from 'react'
import { Icon } from 'react-icons-kit'
import {heart} from 'react-icons-kit/icomoon/heart'
class ThumbnailMeal extends React.Component{
  state = {
    loading: true,
    meals: null
  }
  async componentDidMount(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data = await response.json()
    this.setState({loading:false, meals: data.meals[0]})
  }
  render(){
    return(
      <div className='ThumbnailMeal'>
        {this.state.loading || !this.state.meals ? (<div>Loading...</div>) : (
          <div className='meal' onClick={(event)=>{
            if(event.target.tagName !=='path' && event.target.tagName !=='svg'){
              this.props.onSelect({isOpen:true, selectedMeal: this.state.meals.idMeal})
            }}}
          >
            <div className='thumbnailMeal-image' >
              <div><img src={this.state.meals.strMealThumb} alt="meal"/></div>
              <div className='image-text'> <p>Random Recipe</p> </div>
            </div>
            <div className='thumbnailMeal-title' >
              <h3>{this.state.meals.strMeal}</h3>
                <div onClick={()=>this.props.onFavourite(this.state.meals.idMeal)}><Icon icon={heart}/></div>
            </div>
          </div>)}
      </div>
    )
  }
}
export default ThumbnailMeal
