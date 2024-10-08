import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; /* (модуль для проверки типов входящих пропсов, подключение внизу перед экспортом) */

import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {/* loading, error, */ process, setProcess, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        if (!props.charId) {
            return;
        }
        clearError();
        getCharacter(props.charId)
            .then(data => onCharLoaded(data))
            .then(() => setProcess("confirmed"))
    }

    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {/* (состояния loading и error заменены на FSM - конечный автомат - состояние из utils/setContent - вместо них теперь передаем в функцию setContent нужный компонент и функция отрисует нужный компонент ориентируясь на это состояние) */}
            {setContent(process, View, char)}
        </div>
    )
    
}

const View = ({data}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = data; 

    let imgStyle = {"objectFit": "cover"};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
                <div className="char__descr">
                    {description}
                </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = { /* (проверяем тип приходящих пропсов, в случае несоответствия выдаст предупреждение в консоль) */
    charId: PropTypes.number/* .isRequired */, /* (типизируем, можно добавить флажок, что пропс обязательный(isRequired)) */
}

export default CharInfo;