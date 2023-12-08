import Navitem from "./navitem";
import SearchBar from "./SearchBar";

const Navbar = () =>{
    return (
        <nav className="">
          <ul className="flex justify-center items-center space-x-2 p-4">
            <Navitem to="/">Home</Navitem>
            <Navitem to="/articles">Articles</Navitem>
            <Navitem to="/articles/add">Add Articles</Navitem>
            <Navitem to="/signin">Sign In</Navitem>
            <Navitem to="/signup">Sign Up</Navitem>
            <Navitem to="/drafts">drafts</Navitem>
            <SearchBar/>
          </ul>
        </nav>
    );
};

export default Navbar;