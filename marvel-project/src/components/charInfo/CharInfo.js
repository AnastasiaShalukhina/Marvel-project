import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends React.Component {

  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelS = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();

    this.marvelS
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
      error: false,
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  render() {

    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const view = !(loading || error || !char) ? < View char={char} /> : null;
    return (
      <div className="char__info" >
        {skeleton}
        {spinner}
        {errorMessage}
        {view}
      </div>
    )
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const thumbnailArr = thumbnail.split('/');
  const endOfThumnail = thumbnailArr[thumbnailArr.length - 1];
  const imageNotFound = endOfThumnail === "image_not_available.jpg" ? true : false;
  const imageStyles = imageNotFound ? { objectFit: "contain" } : { objectFit: "cover" };

  const cutedComics = comics.length > 9 ? comics.slice(0, 10) : comics;
  const comicsView = cutedComics.map((item, i) => {
    return (
      <li key={i} className="char__comics-item">
        {item.name}
      </li>
    )
  })
  const comicsToDisplay = comics.length === 0 ? "There isn't any comics to display" : comicsView;

  return (
    <React.Fragment>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imageStyles} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsToDisplay}
      </ul>
    </React.Fragment>
  )
}

export default CharInfo;