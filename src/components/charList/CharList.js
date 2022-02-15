import {useState, useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
            
    
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = (props) => {

    const { error, getAllCharacters, process, setProcess} = useMarvelService()

    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)


   useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
   }, [])

   const onRequest = (offset, initial) => {
        initial? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charlist) => [...charlist, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended)
    }


    const itemRefs = useRef([]);

    const onActive = (index) => {
        itemRefs.current.forEach((item) => {
                item.classList.remove('char__item_selected');
              
        })
        itemRefs.current[index].classList.add('char__item_selected')
        itemRefs.current[index].focus( )
    }



    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems  (arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition in={!error} key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            onActive(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                onActive(i);
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }


    const elements = useMemo(() => {
       return setContent(process, () => renderItems(charList), newItemLoading)
       // eslint-disable-next-line
    }, [process])


        return (
            <div className="char__list">

                {elements}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">{!newItemLoading ? 'load more' : 'loading...'}</div>
                </button>
            </div>
        )
    }


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList
