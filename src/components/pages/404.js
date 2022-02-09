import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"


const Page404 = () => {
  
    return (
      <div>
         <Helmet>
                <meta
                    name="description"
                    content="Page 404 Marvel information portal"
                    />
                <title>404 not found</title>
            </Helmet>
          <ErrorMessage/>
          <p style={{'textAlign' : 'center', 'fontWeight' : 'bold',
                'fontSize' : '24px'}}>Page dosn't exist </p>
          <Link style={{'display' : 'block','textAlign' : 'center', 'fontWeight' : 'bold',
                'fontSize' : '24px', 'marginTop' : '30px', 'color' : 'blue', 'textDecoration' : 'underline'}} to="/"> Back to main page</Link>      
      </div>
    );
  }

  export default Page404;