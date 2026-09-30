document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const pantallaInicio = document.getElementById("pantallaInicio");
    const btnComenzar = document.getElementById("btnComenzar");

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    const modoBtn = document.getElementById("modoBtn");

    const btnMas = document.getElementById("btnMas");
    const textoExtra = document.getElementById("textoExtra");

    const barraProgreso = document.getElementById("barraProgreso");
    const porcentaje = document.getElementById("porcentaje");

    const notificacion = document.getElementById("notificacion");
    const textoNotificacion = document.getElementById("textoNotificacion");

    const cursorPunto = document.getElementById("cursorPunto");

    const modalMision = document.getElementById("modalMision");
    const cerrarMision = document.getElementById("cerrarMision");
    const tituloMision = document.getElementById("tituloMision");
    const textoMision = document.getElementById("textoMision");

    const formulario = document.getElementById("formulario");
    const mensajeFormulario = document.getElementById("mensajeFormulario");

    let interacciones = 0;
    let mensajeTimer;

    const misiones = {
        mantenimiento: {
            titulo: "CPU EN MANTENIMIENTO",
            texto: "Se realizó la limpieza y mantenimiento preventivo del equipo, revisando el interior y sus componentes."
        },
        revision: {
            titulo: "REVISIÓN INTERNA",
            texto: "Se abrió el gabinete para revisar componentes, conexiones y el estado general del equipo."
        },
        limpieza: {
            titulo: "LIMPIEZA COMPLETADA",
            texto: "Se realizó la limpieza interna del equipo para retirar polvo y mantener sus componentes en mejores condiciones."
        }
    };

    function mostrarNotificacion(texto) {

        if (!notificacion || !textoNotificacion) {
            return;
        }

        textoNotificacion.textContent = texto;

        notificacion.classList.remove("mostrar");

        void notificacion.offsetWidth;

        notificacion.classList.add("mostrar");

        clearTimeout(mensajeTimer);

        mensajeTimer = setTimeout(() => {
            notificacion.classList.remove("mostrar");
        }, 3500);
    }

    function sumarInteraccion(cantidad = 1) {

        interacciones += cantidad;

        if (interacciones === 5) {
            mostrarNotificacion("🎨 ¡Ya estás explorando el portafolio!");
        }

        if (interacciones === 10) {
            mostrarNotificacion("💡 ¡10 interacciones! Gustavo tiene más ideas para mostrarte.");
        }

        if (interacciones === 20) {
            mostrarNotificacion("🏆 ¡Explorador creativo desbloqueado!");
        }

        if (interacciones === 30) {
            mostrarNotificacion("🚀 ¡Ya conociste gran parte del portafolio!");
        }
    }

    if (btnComenzar) {

        btnComenzar.addEventListener("click", () => {

            if (pantallaInicio) {
                pantallaInicio.classList.add("oculta");
            }

            document.body.style.overflow = "auto";

            mostrarNotificacion(
                "🎮 ¡Bienvenido al portafolio de Gustavo!"
            );

            sumarInteraccion(3);

            setTimeout(() => {

                const inicio = document.getElementById("inicio");

                if (inicio) {
                    inicio.scrollIntoView({
                        behavior: "smooth"
                    });
                }

            }, 500);

        });

    }

    if (pantallaInicio) {
        document.body.style.overflow = "hidden";
    }

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("abierto");

            const abierto = nav.classList.contains("abierto");

            menuBtn.textContent = abierto ? "✕" : "☰";

            sumarInteraccion();

        });

    }

    if (nav) {

        nav.querySelectorAll("a").forEach(enlace => {

            enlace.addEventListener("click", () => {

                nav.classList.remove("abierto");

                if (menuBtn) {
                    menuBtn.textContent = "☰";
                }

                sumarInteraccion();

            });

        });

    }

    if (modoBtn) {

        const modoGuardado = localStorage.getItem("modoGustavo");

        if (modoGuardado === "oscuro") {

            body.classList.add("modo-oscuro");

            modoBtn.textContent = "☀";

        }

        modoBtn.addEventListener("click", () => {

            body.classList.toggle("modo-oscuro");

            const oscuro = body.classList.contains("modo-oscuro");

            localStorage.setItem(
                "modoGustavo",
                oscuro ? "oscuro" : "claro"
            );

            modoBtn.textContent = oscuro ? "☀" : "☼";

            mostrarNotificacion(
                oscuro
                    ? "🌙 Modo oscuro activado"
                    : "☀️ Modo claro activado"
            );

            sumarInteraccion(2);

        });

    }

    if (btnMas && textoExtra) {

        btnMas.addEventListener("click", () => {

            const mostrar = textoExtra.classList.toggle("mostrar");

            if (mostrar) {

                btnMas.innerHTML = "<span>−</span> Mostrar menos";

                mostrarNotificacion(
                    "💡 ¡Descubriste más sobre Gustavo!"
                );

            } else {

                btnMas.innerHTML = "<span>+</span> Mostrar más";

            }

            sumarInteraccion(2);

        });

    }

    function actualizarProgreso() {

        const alturaTotal =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (alturaTotal <= 0) {
            return;
        }

        const desplazamiento = window.scrollY;

        let progreso =
            (desplazamiento / alturaTotal) * 100;

        progreso = Math.max(
            0,
            Math.min(100, progreso)
        );

        if (barraProgreso) {
            barraProgreso.style.width = `${progreso}%`;
        }

        if (porcentaje) {
            porcentaje.textContent =
                `${Math.round(progreso)}%`;
        }

        actualizarNavegacion();
    }

    window.addEventListener(
        "scroll",
        actualizarProgreso,
        { passive: true }
    );

    actualizarProgreso();

    function actualizarNavegacion() {

        const secciones = document.querySelectorAll(
            "main section[id]"
        );

        const enlaces = nav
            ? nav.querySelectorAll("a")
            : [];

        let actual = "inicio";

        secciones.forEach(seccion => {

            const posicion =
                seccion.getBoundingClientRect().top;

            if (posicion <= 180) {
                actual = seccion.id;
            }

        });

        enlaces.forEach(enlace => {

            enlace.classList.remove("activo");

            const destino =
                enlace.getAttribute("href");

            if (destino === `#${actual}`) {
                enlace.classList.add("activo");
            }

        });

    }

    const observador = new IntersectionObserver(
        entradas => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";
                    entrada.target.style.transform =
                        "translateY(0)";

                    observador.unobserve(
                        entrada.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    const elementosAnimados = document.querySelectorAll(
        ".sobre-card, .sobre-texto, .habilidad-card, .proyecto-card, .foto-mision, .galeria-item, .logro, .formulario"
    );

    elementosAnimados.forEach(elemento => {

        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(30px)";
        elemento.style.transition =
            "opacity .7s ease, transform .7s ease";

        observador.observe(elemento);

    });

    const filtros = document.querySelectorAll(".filtro");
    const proyectos = document.querySelectorAll(".proyecto-card");

    filtros.forEach(filtro => {

        filtro.addEventListener("click", () => {

            filtros.forEach(item => {
                item.classList.remove("activo");
            });

            filtro.classList.add("activo");

            const categoria =
                filtro.dataset.filtro;

            proyectos.forEach(proyecto => {

                const categoriaProyecto =
                    proyecto.dataset.categoria;

                if (
                    categoria === "todos" ||
                    categoriaProyecto === categoria
                ) {

                    proyecto.classList.remove("oculto");

                    setTimeout(() => {
                        proyecto.style.opacity = "1";
                        proyecto.style.transform =
                            "translateY(0)";
                    }, 50);

                } else {

                    proyecto.classList.add("oculto");

                }

            });

            const mensajes = {
                todos: "🎨 Mostrando todos los proyectos",
                identidad: "✦ Proyectos de identidad visual",
                digital: "💻 Proyectos digitales",
                impreso: "🖨️ Proyectos impresos",
                mantenimiento: "🛠️ Prácticas de mantenimiento"
            };

            mostrarNotificacion(
                mensajes[categoria] || "🎨 Explorando proyectos"
            );

            sumarInteraccion(2);

        });

    });

    const botonesMision =
        document.querySelectorAll(".btn-mision");

    botonesMision.forEach(boton => {

        boton.addEventListener("click", evento => {

            evento.stopPropagation();

            const tipo =
                boton.dataset.mision;

            const mision =
                misiones[tipo] ||
                misiones.mantenimiento;

            if (tituloMision) {
                tituloMision.textContent =
                    mision.titulo;
            }

            if (textoMision) {
                textoMision.textContent =
                    mision.texto;
            }

            if (modalMision) {
                modalMision.classList.add("mostrar");
            }

            mostrarNotificacion(
                "🏆 ¡Misión completada!"
            );

            sumarInteraccion(5);

        });

    });

    if (cerrarMision) {

        cerrarMision.addEventListener("click", () => {

            modalMision.classList.remove("mostrar");

        });

    }

    if (modalMision) {

        modalMision.addEventListener("click", evento => {

            if (evento.target === modalMision) {
                modalMision.classList.remove("mostrar");
            }

        });

    }

    document.addEventListener("keydown", evento => {

        if (evento.key === "Escape") {

            if (modalMision) {
                modalMision.classList.remove("mostrar");
            }

            if (nav) {
                nav.classList.remove("abierto");
            }

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }

        }

        if (
            evento.key.toLowerCase() === "d" &&
            !evento.target.matches("input, textarea")
        ) {

            if (modoBtn) {
                modoBtn.click();
            }

        }

        if (evento.key.toLowerCase() === "m") {

            const sobreMi =
                document.getElementById("sobre-mi");

            if (sobreMi) {

                sobreMi.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

        if (evento.key.toLowerCase() === "p") {

            const proyectos =
                document.getElementById("proyectos");

            if (proyectos) {

                proyectos.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

    if (cursorPunto) {

        document.addEventListener(
            "mousemove",
            evento => {

                cursorPunto.style.left =
                    `${evento.clientX}px`;

                cursorPunto.style.top =
                    `${evento.clientY}px`;

                cursorPunto.style.opacity = "1";

            }
        );

        document.addEventListener(
            "mouseleave",
            () => {

                cursorPunto.style.opacity = "0";

            }
        );

        const elementosCursor =
            document.querySelectorAll(
                "a, button, .proyecto-card, .galeria-item, .habilidad-card, img"
            );

        elementosCursor.forEach(elemento => {

            elemento.addEventListener(
                "mouseenter",
                () => {

                    cursorPunto.style.transform =
                        "translate(-50%, -50%) scale(2.5)";

                }
            );

            elemento.addEventListener(
                "mouseleave",
                () => {

                    cursorPunto.style.transform =
                        "translate(-50%, -50%) scale(1)";

                }
            );

        });

    }

    const elementosMovimiento =
        document.querySelectorAll(
            ".decoracion, .tarjeta-flotante"
        );

    document.addEventListener(
        "mousemove",
        evento => {

            const x =
                (evento.clientX /
                    window.innerWidth -
                    0.5) *
                2;

            const y =
                (evento.clientY /
                    window.innerHeight -
                    0.5) *
                2;

            elementosMovimiento.forEach(
                (elemento, indice) => {

                    const fuerza =
                        5 + indice * 2;

                    elemento.style.marginLeft =
                        `${x * fuerza}px`;

                    elemento.style.marginTop =
                        `${y * fuerza}px`;

                }
            );

        }
    );

    const imagenes =
        document.querySelectorAll("img");

    imagenes.forEach(imagen => {

        imagen.addEventListener(
            "click",
            () => {

                imagen.classList.toggle(
                    "imagen-ampliada"
                );

                sumarInteraccion();

            }
        );

    });

    if (formulario) {

        formulario.addEventListener(
            "submit",
            evento => {

                evento.preventDefault();

                const nombre =
                    document.getElementById("nombre");

                const correo =
                    document.getElementById("correo");

                const mensaje =
                    document.getElementById("mensaje");

                if (
                    !nombre ||
                    !correo ||
                    !mensaje
                ) {
                    return;
                }

                const nombreValor =
                    nombre.value.trim();

                const correoValor =
                    correo.value.trim();

                const mensajeValor =
                    mensaje.value.trim();

                if (
                    !nombreValor ||
                    !correoValor ||
                    !mensajeValor
                ) {

                    if (mensajeFormulario) {

                        mensajeFormulario.textContent =
                            "⚠️ Completa todos los campos.";

                    }

                    mostrarNotificacion(
                        "⚠️ Falta completar algunos datos."
                    );

                    return;

                }

                const correoValido =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !correoValido.test(
                        correoValor
                    )
                ) {

                    if (mensajeFormulario) {

                        mensajeFormulario.textContent =
                            "⚠️ Introduce un correo válido.";

                    }

                    mostrarNotificacion(
                        "📧 Revisa tu correo electrónico."
                    );

                    return;

                }

                if (mensajeFormulario) {

                    mensajeFormulario.textContent =
                        `✨ Gracias ${nombreValor}. Tu idea fue recibida.`;

                }

                mostrarNotificacion(
                    `🎨 ¡Gracias ${nombreValor}! Gustavo recibió tu idea.`
                );

                formulario.reset();

                sumarInteraccion(5);

            }
        );

    }

    const enlacesInternos =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    enlacesInternos.forEach(enlace => {

        enlace.addEventListener(
            "click",
            evento => {

                const destino =
                    enlace.getAttribute("href");

                if (
                    destino === "#" ||
                    !destino
                ) {
                    return;
                }

                const elemento =
                    document.querySelector(
                        destino
                    );

                if (elemento) {

                    evento.preventDefault();

                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    sumarInteraccion();

                }

            }
        );

    });

    const tarjetas =
        document.querySelectorAll(
            ".proyecto-card, .habilidad-card, .logro"
        );

    tarjetas.forEach(tarjeta => {

        tarjeta.addEventListener(
            "mouseenter",
            () => {

                sumarInteraccion();

            }
        );

    });

    const logros =
        document.querySelectorAll(".logro");

    logros.forEach((logro, indice) => {

        logro.addEventListener(
            "click",
            () => {

                const mensajes = [
                    "🎨 Logro: Creatividad desbloqueada.",
                    "💡 Logro: Generador de ideas.",
                    "🖥️ Logro: Técnico creativo.",
                    "🚀 Logro: Siempre avanzando."
                ];

                mostrarNotificacion(
                    mensajes[indice] ||
                    "🏆 ¡Logro desbloqueado!"
                );

                sumarInteraccion(3);

            }
        );

    });

    const fotos =
        document.querySelectorAll(
            ".foto-mision"
        );

    fotos.forEach((foto, indice) => {

        foto.addEventListener(
            "click",
            () => {

                const mensajes = [
                    "📸 Paso 01: Preparación del equipo.",
                    "🔧 Paso 02: Revisión interna.",
                    "✨ Paso 03: Limpieza completada."
                ];

                mostrarNotificacion(
                    mensajes[indice] ||
                    "📸 Imagen de la práctica."
                );

                sumarInteraccion(2);

            }
        );

    });

    const nombreGustavo =
        document.querySelector(
            ".hero h2"
        );

    if (nombreGustavo) {

        nombreGustavo.addEventListener(
            "mouseenter",
            () => {

                mostrarNotificacion(
                    "😎 Gustavo Mendoza Aro · Diseñador gráfico"
                );

            }
        );

    }

    const habilidades =
        document.querySelectorAll(
            ".habilidad-card"
        );

    habilidades.forEach(habilidad => {

        habilidad.addEventListener(
            "click",
            () => {

                mostrarNotificacion(
                    "🎯 Habilidad seleccionada."
                );

                sumarInteraccion(2);

            }
        );

    });

    window.addEventListener(
        "keydown",
        evento => {

            if (
                evento.ctrlKey &&
                evento.key.toLowerCase() === "k"
            ) {

                evento.preventDefault();

                mostrarNotificacion(
                    "🎮 Atajo secreto activado: explora y crea."
                );

            }

        }
    );

    setTimeout(() => {

        if (
            pantallaInicio &&
            !pantallaInicio.classList.contains("oculta")
        ) {

            mostrarNotificacion(
                "👋 Haz clic en COMENZAR EXPERIENCIA"
            );

        }

    }, 1500);

});