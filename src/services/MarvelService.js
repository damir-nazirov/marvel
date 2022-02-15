import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
        const {request, clearError, process, setProcess} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    // _apiKey = 'apikey=d2e43c5e49396e7f69511865981d1f12';// Дамир
    const _apiKey = 'apikey=2fead75cd04e58731e687d08f2b87a6c'; // Артём


    const _baseOffset = 210;
    const _baseComicsesOffset = 200;

    // const comicsRequest = 'https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=200&apikey=2fead75cd04e58731e687d08f2b87a6c'

    const getAllComicses = async (offset = _baseComicsesOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComicses);
    }

    //https://gateway.marvel.com:443/v1/public/comics/84124?apikey=2fead75cd04e58731e687d08f2b87a6c

    // const getComic = async (id) => {
    //     const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    //     return res.data.results[0].map(_transformComicses);
    // }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0])

    }

    const _transformComic = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }



    const _transformComicses = (comicses) => {
        return {
            id: comicses.id,
            title: comicses.title,
            // description: comicses.textObjects[0].text || 'There is no description for this comic',
            // comicDescription: comicses.description || 'There is no description for this comic',
            thumbnail: comicses.thumbnail.path + '.' + comicses.thumbnail.extension,
            pageCount: comicses.pageCount,
            // language: comicses.textObjects[0].language || 'en-us',
            price: comicses.prices[0].price ? `${comicses.prices[0].price} $` : 'Comics not available'
        }
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        
        return _transformCharacter(res.data.results[0]);
    }

    // https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=2fead75cd04e58731e687d08f2b87a6c

    // apiBase = 'https://gateway.marvel.com:443/v1/public/';

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    
    // const getCharacterByName = async (name) => {
    //     const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    //     return res.data.results.map(_transformCharacter);
    // }
        
     
       
    

   const _transformCharacter = (char) => {
      
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        process, 
        setProcess, 
        getCharacter, 
        getAllCharacters, 
        getAllComicses, 
        getComic, 
        getCharacterByName,         
        clearError}
}

export default useMarvelService;






















// import { useHttp } from "../hooks/http.hook";


// const  useMarvelService = () => {
//         const {loading, request, error} = useHttp();

//  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

//  const _apiKey = 'apikey=d2e43c5e49396e7f69511865981d1f12';

//  const _baseOffset = 210;



// const getAllCharacters = async (offset = _baseOffset) => {
//     const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
//     return res.data.results.map(_transformCharacter)

// }



// const getCharacter = async (id) => {
//     const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
//     return  _transformCharacter (res.data.results[0])

// }

// const _transformCharacter  = (char) => {
//       return {
//             id: char.id,
//             name: char.name,
//             description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             comics: char.comics.items

//     }      
// }


//         return {loading, error, getCharacter, getAllCharacters}

// }

// export default useMarvelService;


// // path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"

// // "http://i.annihil.us/u/prod/marvel/i/mg/9/20/4ce5a531089da"

// // заменить cover на contain