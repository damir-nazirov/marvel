import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} alt="Error" style={{margin: '0 auto', display: 'block',
    width: '250px', height: '250px', objectFit: 'contain'}}/>
    )
}

export default ErrorMessage;