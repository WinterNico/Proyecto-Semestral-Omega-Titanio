import { Link } from 'react-router-dom';

export const ARTICULOS_BLOG = [
  {
    id: 1,
    titulo: 'Caso Curioso #1: El Impacto de Cloak & Dagger en Marvel Rivals',
    categoria: 'Guías y Meta',
    fecha: '31 de Agosto, 2026',
    resumen:
      'Descubre cómo esta dupla está cambiando las composiciones del equipo en el meta actual del nuevo hero shooter.',
    imagen: '/assets/img/marvelrivals.jpg',
    subtitulo: 'Dominando el posicionamiento',
    contenido: [
      'El reciente lanzamiento de Marvel Rivals ha dejado a la comunidad de Hero Shooters buscando las mejores combinaciones de personajes. Entre ellas, la sinergia de Cloak & Dagger ha resultado ser una de las mecánicas más interesantes del título.',
      'La capacidad de teletransportar aliados a zonas seguras y curarlos simultáneamente ha generado que los equipos cambien drásticamente su forma de defender puntos de control.',
    ],
    cita: 'Un buen jugador de Cloak puede decidir el ritmo de toda una pelea de equipo si sabe leer el mapa correctamente.',
    juegoId: 2,
  },
  {
    id: 2,
    titulo: 'Caso Curioso #2: Rutas de farmeo óptimas en Monster Hunter Wilds',
    categoria: 'Consejos de Caza',
    fecha: '25 de Agosto, 2026',
    resumen:
      'Una guía rápida de las zonas con mejores recursos y cómo optimizar tu tiempo de recolección en los nuevos ecosistemas.',
    imagen: '/assets/img/mhwilds2.jpg',
    subtitulo: 'Aprovechando las Tormentas',
    contenido: [
      'En el vasto mundo de Monster Hunter Wilds, tener los recursos adecuados es la diferencia entre una caza exitosa y volver al campamento en un carro. Las nuevas mecánicas de clima dinámico afectan directamente qué ítems aparecen en cada zona.',
      'Muchos cazadores novatos huyen cuando el clima se vuelve severo, pero es precisamente en estos momentos cuando los minerales raros afloran en la superficie.',
    ],
    cita: 'Prioriza la minería en zonas áridas durante las tormentas de arena y recolecta plantas al cesar la lluvia.',
    juegoId: 1,
  },
];

export default function Noticias() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold text-success mb-1">Noticias y Blogs Importantes</h1>
        <p className="text-secondary mb-0">
          Mantente al día con los casos más curiosos y lanzamientos de nuestra plataforma.
        </p>
      </div>

      <div className="d-flex flex-column gap-4">
        {ARTICULOS_BLOG.map((art) => (
          <div
            className="card bg-secondary bg-opacity-10 border-secondary text-light overflow-hidden"
            key={art.id}
          >
            <div className="row g-0 align-items-center">
              <div className="col-12 col-md-7 p-4">
                <span className="badge bg-success mb-2">{art.categoria}</span>
                <h2 className="h4 fw-bold">{art.titulo}</h2>
                <p className="text-secondary">{art.resumen}</p>
                <Link to={`/noticias/${art.id}`} className="btn btn-outline-success">
                  Leer Caso Completo
                </Link>
              </div>
              <div className="col-12 col-md-5">
                <img
                  src={art.imagen}
                  alt={art.titulo}
                  className="img-fluid w-100"
                  style={{ height: '240px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
