import './header.css';

function Header(){
    return(
        <div id="header-main">
            <div className='coll'>
                <h1 id="header-h1">Donitt</h1>
            </div>
            <div className='coll-1'>
                <a href="/"><h2 className="header-h2">Login</h2></a>
            </div>
            <div className='coll-1'>
                <a href="/about"><h2 className="header-h2">About Us</h2></a>
            </div>
            <div className='coll-1'>
                <a href="/profile"><h2 className="header-h2">Profile</h2></a>
            </div>
            <div className='coll-1'>
                <a href="/home"><h2 className="header-h2">Home</h2></a>
            </div>
        </div>
    )
}
export default Header;