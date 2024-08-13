import { useState, useEffect } from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
        onCharLoading();
        marvelService
            .getCharacter(id) /* (сервис вернет обьект, помещаем его целиком в состояния) */
            .then(onCharLoaded) /* (в промисах пришедший результат автоматически подставится аргументом в вызываемую функцию) */
            .catch(onError);
    }

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;


    return (
        <div className="randomchar">

            {errorMessage}
            {spinner}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    

}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char; 

    const processedDescription = (!description || description.length === 0) 
                                ? "There is not information about this hero here" 
                                : (description.slice(0, 160) + "..."); 
   

    const processedThumbnail = (thumbnail && thumbnail.indexOf("not available") === -1) 
                                ? {objectFit: "contain", alignSelf: "center"} : null;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={processedThumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {processedDescription}
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