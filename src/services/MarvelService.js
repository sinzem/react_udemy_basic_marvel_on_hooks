import { PUBLIC_KEY } from "../env/key.js";
import { useHttp } from "../hooks/http.hook.js";

const useMarvelService = () => {
    /* (состояния loading и error заменены на FSM - конечный автомат - состояние из utils/setContent) */
    const {/* loading,  error, */ request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${PUBLIC_KEY}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${PUBLIC_KEY}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}id?${PUBLIC_KEY}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${PUBLIC_KEY}`
		);
		return res.data.results.map(_transformComics);
	}

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${PUBLIC_KEY}`);
        return _transformComics(res.data.results[0]);
    }
	

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    return {
        // loading,
        // error,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        clearError,
        getAllComics,
		getComics,
    }
}

export default useMarvelService;