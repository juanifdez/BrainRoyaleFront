import './Navbar.css'

export default function Navbar() {
    return(
    <div className="block-nav">
        <div className="nav">
        <nav className="nav-general">
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/app">Principal</a></li>
                <li><a href="/rulespage">Instrucciones</a></li>
                <li><a href="/teampage">Equipo</a></li>
            </ul>
        </nav>
        </div>
    </div>


        );
}