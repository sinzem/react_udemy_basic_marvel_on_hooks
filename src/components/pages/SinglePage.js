import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';
import { Helmet } from 'react-helmet';

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {/* loading, error, */ getComics, getCharacter, clearError, process, setProcess} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComics(id).then(onDataLoaded).then(() => setProcess("confirmed"));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess("confirmed"));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

   /*      const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Component data={data}/> : null; */

        return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content={`${data?.name} page`}
                    />
                    <title>{data?.name}</title>
                </Helmet>
                <AppBanner/>
                {/* {errorMessage}
                {spinner}
                {content} */}
                {setContent(process, Component, data)}
            </>
        )
}

export default SinglePage;