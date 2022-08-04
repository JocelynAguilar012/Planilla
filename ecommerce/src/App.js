// importamos todos los estilos para antd
import './App.scss';
import routes from './config/routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider';


//esta es la funcion componente de rutas-----------------------------------------
function RouteWithSubRoutes(route) {
  return (
<Route 
path={route.path} 
exact={route.exact} 
render={props => <route.component routes={route.routes} {...props}/>}
/>
  );
}
//esta es la funcion de rutas------------------------------------



function App() {

  //Switch   hace que el error 404 solo aparezca solo

  return (

    <AuthProvider>
    <div className="App">
      <Router>

        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index}{...route} />
          ))}

        </Switch>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
