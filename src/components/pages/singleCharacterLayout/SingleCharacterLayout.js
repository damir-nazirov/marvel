import { Helmet } from 'react-helmet';
import './singleCharacterLayout.scss'

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
       
        <>
          <Helmet>
            <meta
                name="description"
                content={`a character named ${name}`}
                />
            <title>{`${name} | Characters |`}</title>
        </Helmet>
            <img src={thumbnail} alt={`${name} character`} className="single-page__img" style={imgStyle} />
            <div className="single-page__info">
                <p className="single-page__name">{name}</p>
                <p className="single-page__descr">
                    {description}
                </p>
            </div>

        </>
       
       
    )
}

export default SingleCharacterLayout;