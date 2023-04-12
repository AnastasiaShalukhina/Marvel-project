import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charsEnded: false,
  }

  marvelS = new MarvelService();

  componentDidMount() {
    this.showNineChar();
  }

  showNineChar = (offset) => {
    this.onCharListLoading();
    this.marvelS
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  }

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ offset, charList }) => (
      {
        charList: [...charList, ...newCharList],
        loading: false,
        error: false,
        newItemLoading: false,
        offset: offset + 9,
        charsEnded: ended,
      }
    ))
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  render() {
    const { charList, loading, error, offset, newItemLoading, charsEnded } = this.state;
    const onCharSelected = this.props.onCharSelected;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const view = !(loading || error) ? < View props={{ charList, onCharSelected }} /> : null;

    return (
      <div className='charr__list'>
        {spinner}
        {errorMessage}
        {view}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ 'display': charsEnded ? 'none' : 'block' }}
          onClick={() => this.showNineChar(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  };
}

const View = ({ props }) => {
  const { charList, onCharSelected } = props;
  const items = charList.map((char) => {
    const thumbnailArr = char.thumbnail.split('/');
    const endOfThumnail = thumbnailArr[thumbnailArr.length - 1];
    const imageNotFound = endOfThumnail === "image_not_available.jpg" ? true : false;
    const imageStyles = imageNotFound ? { objectFit: "contain" } : { objectFit: "cover" };

    return (
      <li
        className="char__item"
        key={char.id}
        onClick={() => onCharSelected(char.id)}
      >
        <img style={imageStyles} src={char.thumbnail} alt={char.name} />
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

CharList.propTypes = {
  onCharSelected: PropTypes.func
}

export default CharList;