import React from 'react';
import {Icon} from 'react-icons-kit'
import {search} from 'react-icons-kit/icomoon/search'
import './App.scss';
import ThumbnailMeal from './Components/ThumbnailMeal'
import FavouriteMeal from './Components/FavouriteMeal'
import SearchMeals from './Components/SearchMeals'
import ModalMeal from './Components/ModalMeal'


class App extends React.Component{
  state = {
    favourites: [],
    modal: {isOpen: false, selectedMeal: ''},
    search: ''
  }
  componentDidMount(){
    try{
      const json = localStorage.getItem('favourites')
      const favourites = JSON.parse(json)
      if (favourites) {
        this.setState({favourites})
      }
    } catch (e) {
    } finally {

    }
  }
  removeFavourite=(id)=>{
    this.setState({favourites: this.state.favourites.filter(item => item !== id)})
  }
  componentDidUpdate(prevProps, prevState){
    localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
  }
  onSelect = (modal) =>{
    console.log(modal);
    this.setState({modal})
  }
  onFavourite = (id) => {
    if (!this.state.favourites.includes(id)){
      this.setState({favourites: [...this.state.favourites, id]})
    }
  }

  render(){
    return(
      <div className='App'>
        {this.state.modal.isOpen ? (<ModalMeal modal={this.state.modal} onSelect={this.onSelect}/>) : (null)}
        <header onClick={()=>console.log(this.state)}>
          <input
            type='text'
            name='search'
            value={this.state.search}
            onChange={(data)=>this.setState({search: data.target.value})}/>
          <Icon icon={search} size={24}/>
        </header>
        <section>{this.state.favourites ? (this.state.favourites.map((meal)=>(
          <FavouriteMeal key={meal} id={meal} favourites={this.state.favourites} removeFavourite={this.removeFavourite} onSelect={this.onSelect}/>
        ))) : null}</section>
        <main>{!!this.state.search ? (<SearchMeals search={this.state.search} onFavourite={this.onFavourite} onSelect={this.onSelect}/>) : (<ThumbnailMeal onFavourite={this.onFavourite} onSelect={this.onSelect}/>)}</main>
      </div>
    )
  }
}

export default App;
