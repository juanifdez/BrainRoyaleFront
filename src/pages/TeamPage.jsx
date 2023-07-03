import Navbar from '../components/Navbar';
import './TeamPage.css'

export default function TeamPage() {
    return (

        <div className="block">
        <Navbar/>
        <h1>Nuestro Equipo</h1>
        <img src="personas/equipo.png" id='team' width="400" height="400"/>
        <h2>Diego Valenzuela - Juanita Fernández</h2>
        <h2>Juanita</h2>
        <img src="personas/dev-woman.png" id='dev-woman'/>
        <p id='p-description'> Juanita Fernández tiene 22 años, estudia Ingeniería Matemática y es encargada del aspecto artístico y el código del juego. A pesar de tener una mente con muchos números, Juanita disfruta del arte y dibujar como hobby! Su flor favorita son los jazmines. Es una amante de los juegos de mesa, le encanta reunirse con su familia o amigos todos los fines de semana a pasar tiempo con ellos y probar un juego nuevo.  </p>
        <h2>Diego</h2>
        <img src="personas/dev-man.png" id='dev-man'/>
        <p id='p-description'> Diego Valenzuela tiene 22 años, estudia Ingeniería en Computación y es encargado de la gestión y el código del juego. A pesar de ser un nerd, a Diego le encanta la música y tocar la guitarra como pasatiempo. Su género de música favorito es el indie rock (aunque su placer culpable es Marcianeke!). Él ama los idiomas y los perros. Su sueño es viajar por el mundo antes de que una nueva pandemia golpee al mundo. Siempre ha querido tenido tener una pelea de boxeo contra un canguro salvaje en Australia.</p>

        </div>
      );
}