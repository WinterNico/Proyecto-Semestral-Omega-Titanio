import { useParams, Link } from 'react-router-dom';
import { ARTICULOS_BLOG } from './Noticias.jsx';

export default function NoticiaDetalle() {
  const { id } = useParams();
  const articulo = ARTICULOS_BLOG.find((a) => String(a.id) === String(id));

  if (!articulo) {
    return (
      <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center">
        <h3>Artículo no encontrado</h3>
        <Link to="/noticias" className="btn btn-success mt-3">
          &larr; Volver a Noticias
        </Link>
      </div>
    );
  }

  return (
    <article className="card bg-secondary bg-opacity-10 border-secondary text-light p-4 p-lg-5">
      <div className="text-center mb-4">
        <span className="badge bg-success mb-2">{articulo.categoria}</span>
        <h1 className="h3 fw-bold text-success">{articulo.titulo}</h1>
        <small className="text-secondary">Publicado el {articulo.fecha}</small>
      </div>

      <img
        src={articulo.imagen}
        alt={articulo.titulo}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: '380px', objectFit: 'cover' }}
      />

      <p className="lead">{articulo.contenido[0]}</p>
      <h3 className="h5 fw-bold text-success mt-3">{articulo.subtitulo}</h3>
      <p>{articulo.contenido[1]}</p>

      <blockquote className="blockquote border-start border-success border-4 ps-3 my-4 text-secondary fst-italic">
        "{articulo.cita}"
      </blockquote>

      <div className="d-flex gap-3 mt-3">
        <Link to="/noticias" className="btn btn-outline-light">
          &larr; Volver a Noticias
        </Link>
        <Link to={`/juego/${articulo.juegoId}`} className="btn btn-success">
          Ver Juego Relacionado &rarr;
        </Link>
      </div>
    </article>
  );
}
