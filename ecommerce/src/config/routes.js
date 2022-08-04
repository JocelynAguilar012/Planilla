//agregamos todas las rutas que estaran interactuando---------------
import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutBasic from '../layouts/LayoutBasic'

//admin
import PageAdminAdmin from '../pages/Admin/Admin'
import PageSingIn from '../pages/SingIn/SingIn'
import PageAdmnUsers from '../pages/Users/Users'
import PageError404 from '../pages/Error404/Error404'
import PageCarousel from '../layouts/Carousel/Carousel'
import PageHome from '../pages/Home/Home';



import PageContact from '../pages/Contact/Contact';
import  {Formulas}  from '../pages/formulas/Formulas';
//agregamos todas las rutas que estaran interactuando---------------

const routes = [
    //agregamos todas las rutas de /admin---------------

    {
    path: "/admin",
    component: LayoutAdmin,
    //si se coloca true solo se mostraria con /admin mas no /admin/login
    exact: false,
    routes: [
        {
            path: "/admin/login",
            component: PageSingIn,
            exact: true
        },
        {
            path: "/admin/Formulas",
            component: Formulas,
            exact: true
        },
        {
            path: "/admin/users",
            component: PageAdmnUsers,
            exact: true
        },
        {
            component: PageError404,
        }
    ]


},
//agregamos todas las rutas de / ---------------
{
path:"/",
component:LayoutBasic,
exact: false,
routes: [
    {
        path: "/",
        component: PageCarousel,
        exact: true

    },
    {
        path: "/Home",
        component: PageHome,
        exact: true

    },
    {
        path: "/admin",
        component: PageAdminAdmin,
        exact: true
    },
    {
        path: "/contact",
        component: PageContact,
        exact: true

    },
    {
        component: PageError404,
    }
]
}
]
export default routes;