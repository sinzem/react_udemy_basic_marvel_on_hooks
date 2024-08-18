import {lazy, Suspense} from "react"; /* (модуль для ленивой подгрузки) */
import {BrowserRouter as Router, Route, Switch/*  Routes */} from "react-router-dom";

// import {MainPage, ComicsPage, SingleComicPage, Page404} from "../pages"; /* (вариант без ленивой загрузки) */
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

/* (ленивая загрузка/импорты - если страницы экспортированы не по дефолту(в д.с через сборочный index.js), все они в финальной сборке попадут в один файл, что увеличит время начальной загрузки, но в lazy-варианте все страницы будут представлять отдельные файлы и подгружаться по необходимости(в роутах оборачиваем страницы в Suspense) - в небольших SPA с этим можно не заморачиваться) */
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    {/* <Routes> */} {/* (вместо switch в 6-й версии используем routes, сами маршруты лаконичнее(можно использовать с закрывающим тегом, если есть дочерние роуты)) */}
                     {/* <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} /> */}
                   {/*  </Routes> */}
                   <Suspense fallback={<Spinner />}> {/* (обертка при работе с ленивой загрузкой, пока подгружается cтраница, выводится на экран fallback) */}
                        <Switch> 
                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>
                            <Route exact path="/"> {/* (главную страницу помещаем последней в списке роутов - ее путь входит в пути всех остальных, это может давать проблему при загрузке страниц(switch и exact делают строгое сравнение)) */}
                                <MainPage />
                            </Route>
                            <Route exact path="/comics/:comicId">
                                <SingleComicPage />
                            </Route>
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                   </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;