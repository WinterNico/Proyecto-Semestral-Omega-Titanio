export default function Nosotros() {
  const equipo = [
    {
      inicial: 'N',
      nombre: 'Nicolás Morales',
      rol: 'Estructura & Vistas Tienda',
      desc: 'Encargado de estructurar el maquetado semántico y las vistas de usuario en React.',
    },
    {
      inicial: 'E',
      nombre: 'Exequiel Romero',
      rol: 'Datos, Estado & Validaciones',
      desc: 'Responsable de la capa de persistencia en LocalStorage, Context y validaciones.',
    },
    {
      inicial: 'J',
      nombre: 'Javier Tapia',
      rol: 'Diseño UI, Admin & Pruebas',
      desc: 'Responsable del diseño responsivo, panel de administración y pruebas unitarias.',
    },
  ];

  return (
    <div>
      <section className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center mb-5">
        <h1 className="h3 fw-bold text-success mb-3">Nuestra Historia</h1>
        <p className="text-secondary mx-auto mb-0" style={{ maxWidth: '720px' }}>
          Somos una plataforma creada por y para jugadores. Buscamos ofrecer el mejor catálogo de
          videojuegos digitales con una experiencia rápida, segura e intuitiva, desarrollada con
          React y Bootstrap para DSY1104.
        </p>
      </section>

      <h2 className="h4 fw-bold text-success mb-4">El Equipo Desarrollador</h2>
      <div className="row g-4">
        {equipo.map((m) => (
          <div className="col-12 col-md-4" key={m.nombre}>
            <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4 text-center h-100">
              <div
                className="rounded-circle bg-success text-dark fw-bold d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '70px', height: '70px', fontSize: '1.5rem' }}
              >
                {m.inicial}
              </div>
              <h5 className="fw-bold mb-1">{m.nombre}</h5>
              <small className="text-success d-block mb-2">{m.rol}</small>
              <p className="text-secondary small mb-0">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
