import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner'
import setContent from '../../utils/setContent';




const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);

    const {getCharacter, getComic, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id])


    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'))
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'))
                break;
                default:
                    break;
        }
    }


    
    const onDataLoaded = (data) => {
        setData(data);

    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
       <>
        <AppBanner/>
        <div className='single-page'>
           {setContent(process, Component, data)}
      
        </div>
        </>
    )



    
}



export default SinglePage;