import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
// import abyss from '../../assets/images/abyss.jpg';

class CharList extends Component {

  state = {
    charList: [],
    loading: true,
    error: false,
  }

  marvelS = new MarvelService();

  componentDidMount() {
    this.showNineChar();
  }

  onNineCharLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  showNineChar = () => {
    this.marvelS
      .getAllCharacters()
      .then(this.onNineCharLoaded)
      .catch(this.onError);
  }

  render() {
    const { charList, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const view = !(loading || error) ? < View charList={charList} /> : null;

    return (
      <div className='charr__list'>
        {spinner}
        {errorMessage}
        {view}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  };
}

const View = ({ charList }) => {
  const items = charList.map((char) => {
    const thumbnailArr = char.thumbnail.split('/');
    const endOfThumnail = thumbnailArr[thumbnailArr.length - 1];
    const imageNotFound = endOfThumnail === "image_not_available.jpg" ? true : false;
    const imageStyles = imageNotFound ? { objectFit: "contain" } : { objectFit: "cover" };

    return (
      <li className="char__item" id={char.id} key={char.id}>
        <img style={imageStyles} src={char.thumbnail} alt="name of character" />
        <div className="char__name">{char.name}</div>
      </li>
    )
  })

  return (
    <ul className="char__grid">
      {items}
    </ul>
  )
}

export default CharList;