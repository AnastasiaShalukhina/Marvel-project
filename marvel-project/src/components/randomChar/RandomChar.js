import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../assets/images/mjolnir.png';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {

  state = {
    char: {},
    loading: true,
    error: false,
  }

  marvelS = new MarvelService();

  componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 5000)
  }

  // if setting the interval so it is needed to clear the interval because the component will be kept in the memory with interval
  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // }

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

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading();
    this.marvelS
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }


  render() {
    const { char, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const view = !(loading || error) ? < View char={char} /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;



    return (
      <div className="randomchar">
        {spinner}
        {errorMessage}
        {view}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main"
            onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki } = char;
  const thumbnailArr = thumbnail.split('/');
  const endOfThumnail = thumbnailArr[thumbnailArr.length - 1];
  const imageNotFound = endOfThumnail === "image_not_available.jpg" ? true : false;
  const imageStyles = imageNotFound ? { objectFit: "contain" } : { objectFit: "cover" };

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={imageStyles} />
      <div className="randomchar__info">
        <h3 className='randomchar__name'>{name}</h3>
        <p className="randomchar__descr">
          {description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;