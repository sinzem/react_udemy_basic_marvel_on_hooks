import {BrowserRouter as Router, Route, Switch/*  Routes */} from "react-router-dom";

import {MainPage, ComicsPage, SingleComicPage, Page404} from "../pages";
import AppHeader from "../appHeader/AppHeader";

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
                </main>
            </div>
        </Router>
    )
}

export default App;