import useMarvelService from '../../services/MarvelService';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import './comicsList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {

    const {loading, error, clearError, getAllComicses} = useMarvelService()   
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(200)
    const [comicsEnded, setComicsEnded] = useState(false)


   useEffect(() => {
        onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
        clearError();
        initial? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComicses(offset)
            .then(onComicsListLoaded)
    }


    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setComicsEnded(ended)
    }



    function renderItems  (arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (

                <li className="comics__item"
                key={i}
                >
                <Link to={`/comics/${item.id}`}>
                    <img style={imgStyle} src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>

            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

   

       
        const items = renderItems(comicsList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;
        // const content = !(loading || error) ? items : null;

        return (
            <div className="comics__list">
                {errorMessage}
                {spinner}
                {items}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">{!newItemLoading ? 'load more' : 'loading...'}</div>
                </button>
            </div>
        )
    }





export default ComicsList;