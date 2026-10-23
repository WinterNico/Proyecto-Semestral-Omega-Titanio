import { validarRun, validarCorreo, calcularPrecioFinal, formatearCLP, formatearMontoBoleta } from '../src/utils/validaciones.js';
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

describe('Módulo db.js - actualizar, eliminar y reset', () => {
    beforeEach(() => localStorage.clear());

    it('11. actualizar: modifica solo los campos indicados y persiste', () => {
        const p = db.productos.crear({ nombre: 'A', precio: 1 });
        expect(db.productos.actualizar(p.id, { precio: 99 }).precio).toBe(99);
        expect(db.productos.obtenerPorId(p.id).nombre).toBe('A');
    });

    it('12. actualizar: retorna null si el id no existe', () => {
        expect(db.productos.actualizar(999999, { precio: 1 })).toBeNull();
    });

    it('13. eliminar: borra el registro y retorna true', () => {
        const p = db.productos.crear({ nombre: 'A' });
        expect(db.productos.eliminar(p.id)).toBeTrue();
        expect(db.productos.obtenerPorId(p.id)).toBeNull();
    });

    it('14. eliminar: retorna false si el id no existe', () => {
        expect(db.productos.eliminar(999999)).toBeFalse();
    });

    it('15. obtenerTodos: con JSON corrupto en storage usa los datos semilla', () => {
        localStorage.setItem('omega_productos', '{corrupto');
        expect(db.productos.obtenerTodos().length).toBeGreaterThan(0);
    });

    it('16. resetTodo: restaura los datos semilla', () => {
        db.productos.crear({ nombre: 'Temporal' });
        db.resetTodo();
        expect(db.productos.obtenerTodos().some((p) => p.nombre === 'Temporal')).toBeFalse();
    });

    it('17. guardar: si localStorage falla no lanza error y lo registra (mock)', () => {
        spyOn(localStorage, 'setItem').and.throwError('Storage lleno');
        spyOn(console, 'error');
        expect(() => db.productos.crear({ nombre: 'X' })).not.toThrow();
        expect(console.error).toHaveBeenCalled();
    });
});

describe('Formato de montos', () => {
    it('18. formatearCLP: precio 0 se muestra como "Gratis"', () => {
        expect(formatearCLP(0)).toBe('Gratis');
    });

    it('19. formatearCLP: usa separador de miles chileno', () => {
        expect(formatearCLP(15990)).toBe('$15.990');
    });

    it('20. formatearMontoBoleta: formatea el total de una boleta', () => {
        expect(formatearMontoBoleta(1450000)).toBe('$1.450.000');
    });
});