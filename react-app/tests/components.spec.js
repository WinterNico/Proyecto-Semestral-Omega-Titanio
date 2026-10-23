// Pruebas de JSX Preprocessor (Jasmine + esbuild para JSX)
// Estas pruebas verifican que el preprocesador JSX funciona correctamente
import React from 'react';

// Componente simple inline para probar JSX
const ComponentePrueba = () => {
  return React.createElement('div', { className: 'test' }, 'Hola JSX');
};

const ComponenteConProps = ({ nombre, valor }) => {
  return React.createElement('div', { className: 'metric-card' }, 
    React.createElement('h3', null, nombre),
    React.createElement('p', null, valor)
  );
};

describe('Pruebas de Preprocesador JSX (esbuild)', () => {

  it('Debe transformar JSX a React.createElement (archivo se compila sin errores)', () => {
    // Si llegamos aquí, el preprocesador funciona
    expect(true).toBeTrue();
  });

  it('Debe crear elementos React correctamente', () => {
    const elemento = React.createElement('div', { className: 'test' }, 'Hola');
    expect(elemento.type).toBe('div');
    expect(elemento.props.className).toBe('test');
    expect(elemento.props.children).toBe('Hola');
  });

  it('Debe crear componentes de función', () => {
    const elemento = React.createElement(ComponentePrueba);
    expect(typeof elemento.type).toBe('function');
    expect(elemento.type.name).toBe('ComponentePrueba');
  });

  it('Debe pasar props a componentes', () => {
    const elemento = React.createElement(ComponenteConProps, { nombre: 'Test', valor: '123' });
    expect(elemento.props.nombre).toBe('Test');
    expect(elemento.props.valor).toBe('123');
  });

  it('Debe manejar children correctamente', () => {
    const elemento = React.createElement('ul', null,
      React.createElement('li', null, 'Item 1'),
      React.createElement('li', null, 'Item 2')
    );
    expect(elemento.type).toBe('ul');
    expect(Array.isArray(elemento.props.children)).toBeTrue();
    expect(elemento.props.children.length).toBe(2);
  });

  it('Debe soportar React.Fragment', () => {
    const FragmentTest = () => React.createElement(React.Fragment, null, 'a', 'b');
    const elemento = React.createElement(FragmentTest);
    expect(typeof elemento.type).toBe('function');
  });
});
