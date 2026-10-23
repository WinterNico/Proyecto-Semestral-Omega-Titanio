import { validarRun, validarCorreo, calcularPrecioFinal } from '../src/utils/validaciones.js';
import { db } from '../src/data/db.js';

describe('Pruebas Unitarias - Panel Admin (Jasmine)', () => {

    // --- PRUEBAS DE VALIDACIONES (6 pruebas) ---
    describe('Módulo de Validaciones', () => {
        it('1. validarRun: Debe retornar true para un RUN válido (19011022K)', () => {
            expect(validarRun('19011022K')).toBeTrue();
        });

        it('2. validarRun: Debe retornar false para un RUN inválido o corto (123)', () => {
            expect(validarRun('123')).toBeFalse();
        });

        it('3. validarCorreo: Debe aceptar correos de alumnos Duoc (@duoc.cl)', () => {
            expect(validarCorreo('pedro@duoc.cl')).toBeTrue();
        });

        it('4. validarCorreo: Debe rechazar dominios externos no permitidos (@yahoo.com)', () => {
            expect(validarCorreo('pedro@yahoo.com')).toBeFalse();
        });

        it('5. calcularPrecioFinal: Debe devolver el precio completo si no hay oferta', () => {
            const juego = { precio: 20000, oferta: false, descuento: 0 };
            expect(calcularPrecioFinal(juego)).toBe(20000);
        });

        it('6. calcularPrecioFinal: Debe aplicar el descuento correcto (50% de 20000 = 10000)', () => {
            const juego = { precio: 20000, oferta: true, descuento: 50 };
            expect(calcularPrecioFinal(juego)).toBe(10000);
        });
    });

    // --- PRUEBAS DE BASE DE DATOS (4 pruebas) ---
    describe('Módulo de Base de Datos Simulada (db.js)', () => {
        beforeEach(() => {
            // Se limpia el storage para mantener limpia las demas pruebas
            localStorage.clear();
        });

        it('7. spyOn: Debe llamar a localStorage.getItem al usar obtenerTodos()', () => {
            // Configuramos al spy sobre el método nativo de lectura
            spyOn(localStorage, 'getItem').and.callThrough();
            
            db.productos.obtenerTodos();
            
            // Verificamos que el spy detecto la llamada con la clave correcta
            expect(localStorage.getItem).toHaveBeenCalledWith('omega_productos');
        });

        it('8. spyOn: Debe llamar a localStorage.setItem al crear un producto nuevo', () => {
            // Configuramos el spy sobre el metodo nativo de escritura
            spyOn(localStorage, 'setItem');
            
            db.productos.crear({ nombre: 'Juego de Prueba', precio: 5000 });
            
            expect(localStorage.setItem).toHaveBeenCalled();
        });

        it('9. obtenerPorId: Debe retornar null si el producto solicitado no existe', () => {
            expect(db.productos.obtenerPorId(999999)).toBeNull();
        });

        it('10. crear: Debe asignar un ID automáticamente al nuevo registro', () => {
            const nuevoUsuario = db.usuarios.crear({ nombre: 'Usuario Test' });
            expect(nuevoUsuario.id).toBeDefined();
            expect(nuevoUsuario.nombre).toBe('Usuario Test');
        });
    });
});