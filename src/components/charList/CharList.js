import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; /* (модуль для проверки типов входящих пропсов, подключение внизу перед экспортом) */
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
// import setContent from '../../utils/setContent';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading": 
            return newItemLoading ? <Component /> : <Spinner />;
        case "confirmed": 
            return <Component />
        case "error":
            return <ErrorMessage /> 
        default:
            throw new Error("Unexpected process state");
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        /* (если важно учитывать предыдущее состояние, прописываем через callback, если не важно, можно без него) */
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset) 
            .then(onCharsLoaded) /* (в промисах пришедший результат автоматически подставится аргументом в вызываемую функцию) */
            .then(() => setProcess("confirmed"));
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
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li className="char__item" 
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
                </CSSTransition>
            )
        })
        return (
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }

    // const items = renderItems(charList);

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            
            {/* {errorMessage}
            {spinner}
            {items} */}
            {setContent(process, () => renderItems(charList), newItemLoading)}
            
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