document.addEventListener('DOMContentLoaded', () => {
    // VARIABLES REGEX //
    const regexEmail = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    const regexRun = /^[0-9]{7,8}[0-9Kk]$/;

    // FORMULARIO CONTACTO //
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        const inputComentario = document.getElementById('contact-comentario');
        const charCount = document.getElementById('contact-char-count');
        const errorComentario = document.getElementById('error-contact-comentario');

        // contador de char
        inputComentario.addEventListener('input', () => {
            // no superara el texto 500 palabras, si hay mas se corta
            if (inputComentario.value.length > 500) {
                inputComentario.value = inputComentario.value.substring(0, 500);
            }
            
            const cantidadActual = inputComentario.value.length;
            charCount.textContent = cantidadActual;
            charCount.style.color = (cantidadActual >= 500) ? 'red' : '#a3a3a3';
        });

        formContacto.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const email = document.getElementById('contact-email').value;
            const comentario = inputComentario.value;
            
            const errorEmail = document.getElementById('error-contact-email');
            
            let esValido = true;
            errorEmail.textContent = "";
            errorComentario.textContent = ""; 

            // validaciones CONTACTO
            if (!regexEmail.test(email)) {
                errorEmail.textContent = "Dominio no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com";
                esValido = false;
            } 
            // comentario o consulta
            if (comentario.trim().length === 0) {
                errorComentario.textContent = "El comentario es obligatorio.";
                esValido = false;
            } 

            // todo valido
            if (esValido) {
                alert("¡Mensaje enviado con éxito!");
                formContacto.reset();
                charCount.textContent = "0";
                charCount.style.color = '#a3a3a3'; 
            }
        });
    }

    // FORMULARIO REGISTRO //
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const run = document.getElementById('reg-run').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-password').value;
            const passConfirm = document.getElementById('reg-confirm-password').value;

            // para errores
            const errorRun = document.getElementById('error-reg-run');
            const errorEmail = document.getElementById('error-reg-email');
            const errorPass = document.getElementById('error-reg-password');
            const errorConfirm = document.getElementById('error-reg-confirm-password');

            // activador 
            let esValido = true;
            errorRun.textContent = ""; 
            errorEmail.textContent = ""; 
            errorPass.textContent = ""; 
            errorConfirm.textContent = "";

            // condiciones if para validar
            if (!regexRun.test(run)) {
                errorRun.textContent = "RUN inválido. Ingresa entre 7 y 9 caracteres sin puntos ni guión.";
                esValido = false;
            }
            if (!regexEmail.test(email)) {
                errorEmail.textContent = "Correo inválido o dominio no permitido.";
                esValido = false;
            }
            if (pass.length < 4 || pass.length > 10) {
                errorPass.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
                esValido = false;
            }
            if (pass !== passConfirm) {
                errorConfirm.textContent = "Las contraseñas no coinciden.";
                esValido = false;
            }

            if (esValido) {
                alert("¡Usuario registrado exitosamente en Steam Store!");
                formRegistro.reset();
            }
        });
    }

    // FORMULARIO LOGIN //
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;

            const errorEmail = document.getElementById('error-login-email');
            const errorPass = document.getElementById('error-login-password');

            let esValido = true;
            errorEmail.textContent = ""; 
            errorPass.textContent = ""; 

            if (!regexEmail.test(email)) {
                errorEmail.textContent = "Correo inválido o dominio no permitido.";
                esValido = false;
            }
            if (pass.length < 4 || pass.length > 10) {
                errorPass.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
                esValido = false;
            }

            if (esValido) {
                alert("¡Sesión iniciada con éxito!");
                window.location.href = "/index.html"; 
            }
        });
    }

    // Logica para admin - usuarios //
    const formAdminUsuario = document.getElementById('form-admin-usuario');
    if (formAdminUsuario) {
        formAdminUsuario.addEventListener('submit', (e) => {
            e.preventDefault();

            const run = document.getElementById('admin-user-run').value;
            const email = document.getElementById('admin-user-email').value;
            const errorRun = document.getElementById('error-admin-user-run');
            const errorEmail = document.getElementById('error-admin-user-email');

            let esValido = true;
            errorRun.textContent = "";
            errorEmail.textContent = "";

            // se recicla lo q ya tenemos
            if (!regexRun.test(run)) {
                errorRun.textContent = "RUN inválido. Ingresa entre 7 y 9 caracteres sin puntos ni guión.";
                esValido = false;
            }
            if (!regexEmail.test(email)) {
                errorEmail.textContent = "Dominio no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com";
                esValido = false;
            }

            if (esValido) {
                alert("¡Usuario administrador registrado exitosamente en el sistema!");
                formAdminUsuario.reset();
            }
        });
    }
});