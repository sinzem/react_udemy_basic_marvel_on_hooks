import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; /* (модуль для проверки типов входящих пропсов, подключение внизу перед экспортом) */

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        /* (если важно учитывать предыдущее состояние, прописываем через callback, если не важно, можно без него) */
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset) 
            .then(onCharsLoaded) /* (в промисах пришедший результат автоматически подставится аргументом в вызываемую функцию) */
            .catch(onError);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {"objectFit": "cover"};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {"objectFit": "unset"};
            }

            return ( 
                <li className="char__item" 
                    key={item.id}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} /* (напрямую добавляем каждый элемент в массив с рефами) */
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i);
                    
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            
            {errorMessage}
            {spinner}
            {content}
            
            <button 
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{"display": charEnded ? "none" : "block"}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {  /* (проверяем тип приходящих пропсов, в случае несоответствия выдаст предупреждение в консоль) */
    onCharSelected: PropTypes.func.isRequired, /* (типизируем, можно добавить флажок, что пропс обязательный(isRequired)) */
}

export default CharList;