import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// import { useState, useEffect } from 'react';
// import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import AppBanner from '../appBanner/AppBanner'

import './singleComicLayout.scss'


const SingleComicLayout = ({data}) => {

    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <>
        <Helmet>
            <meta
                name="description"
                content={`${title} comic book`}
                />
            <title>{title}</title>
        </Helmet>
        <img src={thumbnail} alt={title} className="single-page__img"/>
        <div className="single-page__info">
            <h2 className="single-page__name">{title}</h2>
            <p className="single-page__descr">{description}</p>
            <p className="single-page__descr">{pageCount}</p>
            <p className="single-page__descr">Language: {language}</p>
            <div className="single-page__price">{price}</div>
        </div>
        <Link to="/comics" className="single-page__back">Back to all</Link>
    </>
    )
      
    
}

export default SingleComicLayout;