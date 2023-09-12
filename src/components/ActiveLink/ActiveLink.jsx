import { NavLink } from 'react-router-dom';

const ActiveLink = ({to, children}) => {
    return (
        <NavLink
        to={to}
        className={({ isActive}) => isActive ? "bg-gray-800 text-white flex items-center gap-1 px-10 py-2 w-11/12 rounded-r-lg" : "flex items-center gap-1 px-10 py-2 w-11/12 rounded-r-lg hover:bg-gray-200 transition" }
                  >
                    {children}
                  </NavLink>
    );
};

export default ActiveLink;