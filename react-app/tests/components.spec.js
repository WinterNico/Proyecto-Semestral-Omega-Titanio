// tests/components.spec.js
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MetricCard from '../src/components/common/MetriCard.jsx';
import RutaProtegida from '../src/components/layout/RutaProtegida.jsx';
import { CartProvider } from '../src/context/CartContext.jsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let raiz, contenedor;
async function montar(ui) {
  contenedor = document.createElement('div');
  document.body.appendChild(contenedor);
  raiz = createRoot(contenedor);
  await act(async () => raiz.render(ui));
  return contenedor;
}

describe('Componentes del panel admin', () => {
  beforeEach(() => localStorage.clear());
  afterEach(async () => {
    await act(async () => raiz.unmount());
    contenedor.remove();
  });

  describe('MetricCard (props)', () => {
    it('muestra título y valor recibidos por props', async () => {
      const div = await montar(<MemoryRouter><MetricCard titulo="Usuarios" valor="18" textoEnlace="ok" /></MemoryRouter>);
      expect(div.querySelector('h3').textContent).toBe('Usuarios');
      expect(div.querySelector('.metric-value').textContent).toBe('18');
    });

    it('renderiza un enlace con el href indicado cuando recibe "enlace"', async () => {
      const div = await montar(<MemoryRouter><MetricCard titulo="U" valor="1" enlace="/admin/usuarios" textoEnlace="Ver" /></MemoryRouter>);
      expect(div.querySelector('a').getAttribute('href')).toBe('/admin/usuarios');
    });

    it('aplica estilo de alerta (borde rojo) con esAlerta=true', async () => {
      const div = await montar(<MemoryRouter><MetricCard titulo="Stock" valor="1" textoEnlace="x" esAlerta /></MemoryRouter>);
      expect(div.querySelector('.metric-card').classList.contains('border-danger')).toBeTrue();
      expect(div.querySelector('a')).toBeNull();
    });
  });

  describe('RutaProtegida (mock de sesión con spyOn)', () => {
    const app = (
      <MemoryRouter initialEntries={['/admin']}>
        <CartProvider>
          <Routes>
            <Route element={<RutaProtegida />}>
              <Route path="/admin" element={<p>PANEL</p>} />
            </Route>
            <Route path="/login" element={<p>LOGIN</p>} />
            <Route path="/" element={<p>TIENDA</p>} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );
    const conSesion = (usuario) =>
      spyOn(localStorage, 'getItem').and.callFake((k) =>
        k === 'omega_sesion_activa' ? JSON.stringify(usuario) : null);

    it('sin sesión redirige a /login', async () => {
      expect((await montar(app)).textContent).toBe('LOGIN');
    });
    it('usuario cliente es enviado a la tienda', async () => {
      conSesion({ id: 2, rol: 'cliente' });
      expect((await montar(app)).textContent).toBe('TIENDA');
    });
    it('usuario admin accede al panel', async () => {
      conSesion({ id: 1, rol: 'admin' });
      expect((await montar(app)).textContent).toBe('PANEL');
    });
  });
});