import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="error page"
                    content="Error wrning"
                />
                <title>Error wrning</title>
            </Helmet>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link to="/" style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Back to main page</Link>
        </div>
    )
}

export default Page404;