import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from "../components/skeleton/Skeleton";

/* (cоздаем finite state machine - состояние для рендера компонента, которое заменит наборы условий при рендере, а также заменит состояние loading и error, получится каждому состоянию соответствует только один возможный компонент, а не длинный набор условий) */
const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting":
            return <Skeleton />;
        case "loading": 
            return <Spinner />;
        case "confirmed": 
            /* (будем передавать именно нужный компонент верстки пропсом) */
            return <Component data={data} />
        case "error":
            return <ErrorMessage /> 
        default:
            throw new Error("Unexpected process state");
    }

}

export default setContent;