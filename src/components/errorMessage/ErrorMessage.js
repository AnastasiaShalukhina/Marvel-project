import image from './error-cat.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <img className="error" src={image} alt="video of cat skating and text 404 error" />
  )
}

export default ErrorMessage;