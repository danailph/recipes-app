import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

class ModalMeal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      meal: null,
    };
  }

  async componentDidMount(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.modal.selectedMeal}`)
    const data = await response.json()
    console.log(data.meals[0]);
    this.setState({loading:false, meal: data.meals[0]})
  }


  get ingrediants(){
    let array =[]
    for(let i=1; i<=20; i++){
      if (this.state.meal["strIngredient"+i]){
        array.push(<li key={i}>{this.state.meal["strIngredient"+i]} / {this.state.meal["strMeasure"+i]}</li>)
      }
    }
    return array
  }

  componentWillUnmounth(){

  }



  closeModal = () => this.props.onSelect({isOpen:false, selectedMeal: ''})



  render(){
    return(
      <div>
      {this.state.loading ? (null) : (<Modal
        isOpen={this.props.modal.isOpen}
        onRequestClose={this.closeModal}
        className="Modal"
         overlayClassName="Overlay"
      >
        <button onClick={this.closeModal}>X</button>
        <h2>{this.state.meal.strMeal}</h2>
        <img src={this.state.meal.strMealThumb} alt="meal"/>
        <p> {this.state.meal.strInstructions}</p>
        <h3>Ingredients: </h3>
        <ul>{this.ingrediants}</ul>

      </Modal>)}
      </div>
    )
  }
}
export default ModalMeal
