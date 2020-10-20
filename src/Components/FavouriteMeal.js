import React from 'react'

class ThumbnailMeal extends React.Component{
  state = {
    loading: true,
    meal: null
  }
  async componentDidMount(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.id}`)
    const data = await response.json()
    this.setState({loading:false, meal: data.meals[0]})
  }

  render(){
    return(
      <div className='FavouriteMeal' onClick={(event)=>{
          if(event.target.tagName !=='BUTTON'){
            this.props.onSelect({isOpen:true, selectedMeal: this.props.id})
          }}}>
        {this.state.loading || !this.state.meal ? (<div>Loading...</div>) : (
          <div className='img'>
            <img src={this.state.meal.strMealThumb} alt="meal"/>
            <button onClick={()=>this.props.removeFavourite(this.state.meal.idMeal)}>X</button>
          </div>) }

      </div>
    )
  }
}
export default ThumbnailMeal
