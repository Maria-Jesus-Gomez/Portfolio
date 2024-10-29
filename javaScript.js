document.addEventListener('DOMContentLoaded', function() {
    var otrosDatos = document.getElementById('otrosDatos');
    var customAlert = document.getElementById('customAlert');
    
document.getElementById('contactForm').addEventListener('submit', function(event) {
    /*Evita el envío del formulario*/
    event.preventDefault();  
    
    /*valores de los campos*/
     var nombre = document.getElementById('nombre').value.trim();
     var email = document.getElementById('email').value.trim();
     var telefono = document.getElementById('telefono').value.trim();
     var actividad = document.getElementById('actividad').value.trim();
    
     
    /*Valida el nombre*/
     if (nombre === '') {
         alert('Por favor, ingrese el nombre de la empresa.');
         return;
     }

    /*Valida el correo electrónico*/
     if (email === '') {
         alert('Por favor, ingrese un correo electrónico.');
         return;
     } 
     else if (!/\S+@\S+\.\S+/.test(email)) {
         alert('Por favor, ingrese un correo electrónico válido.');
     return;
     }
     
    /*Valida el teléfono*/
     if (telefono === '') {
         alert('Por favor, ingrese un número de teléfono.');
         return;
     }
     else if (!/^\d+$/.test(telefono)) {
         alert('Por favor, ingrese un número de teléfono válido (solo dígitos).');
    return;
     }
     
    /*Valida la actividad*/
     if (actividad === 'Actividad') {
         alert('Por favor, seleccione una actividad.');
     return;
     }

    /*Si todas las validaciones son correctas, muestra este mensaje*/
     alert('Formulario enviado exitosamente!');
     
    /*Envia el formulario si todas las validaciones son correctas*/
     this.submit();
 });   
});      

    /*Esto muestra el alert "INFORMACIÓN PERSONAL" en la pestaña de otros datos*/
document.addEventListener('DOMContentLoaded', function() {
    var otrosDatos = document.getElementById('otrosDatos');
    var customAlert = document.createElement('div'); /*Crea el elemento div para la ventana emergente*/
    customAlert.id = 'customAlert'; /*Asigna el id*/
    customAlert.textContent = 'Información personal'; /*Texto de la ventana emergente*/
    document.body.appendChild(customAlert); 

    otrosDatos.addEventListener('mouseover', function(event) {

    /*Muestra la ventana emergente*/
    customAlert.style.display = 'block';

    /*Posición de la ventana emergente*/
    customAlert.style.left = (event.pageX + 10) + 'px';
    customAlert.style.top = (event.pageY + 10) + 'px';

    /*Oculta la ventana emergente en 2 segundos*/
        setTimeout(function() {
        customAlert.style.display = 'none';
        }, 2000);
    });

    otrosDatos.addEventListener('mouseout', function() {

    /*Oculta la ventana emergente cuando el ratón sale*/
        customAlert.style.display = 'none';
    });
});
 
/*JSON de estudios*/
document.addEventListener('DOMContentLoaded', function() {
    fetch('estudios.json')
        .then(response => response.json())
        .then(data => {
            const estudiosDiv = document.getElementById('estudios');

            /*Contenido de estudios*/
            let estudiosContent = '<strong><h1>Estudios</h1></strong><br>';
            data.estudios.forEach(estudio => {
                estudiosContent += `
                    <h3>${estudio.titulo}</h3>
                    ${estudio.nombre} <br>
                    ${estudio.instituto} - <a href="${estudio.link}" target="_blank">Más información</a><br>
                    ${estudio.periodo}<br><br>
                `;
            });

            /*Contenido de idiomas*/
            estudiosContent += '<h3>IDIOMAS</h3>';
            data.idiomas.forEach(idioma => {
                estudiosContent += `${idioma.nombre} (${idioma.nivel})<br>`;
            });

            estudiosContent += '<br>';

            /* Contenido de ofimática*/
            estudiosContent += '<h3>OFIMATICA</h3>';
            data.ofimatica.forEach(ofimatica => {
                estudiosContent += `${ofimatica.nombre} (${ofimatica.nivel})<br>`;
            });

            /*Agrega el contenido al div*/
            estudiosDiv.innerHTML = estudiosContent;
        })
        .catch(error => console.error('Error cargando los datos:', error));
});

/*JSON de experiencia laboral*/
document.addEventListener('DOMContentLoaded', function() {
    fetch('experiencialaboral.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            const experienciaDiv = document.getElementById('experiencia-laboral');
            let experienciaContent = '';

            data.experiencias.forEach(experiencia => {
                experienciaContent += `
                    <div class="experiencia">
                        <h3>${experiencia.titulo}</h3>
                        ${experiencia.empresa} <br>
                        ${experiencia.sector} <br>
                        ${experiencia.periodo} <br>
                        ${experiencia.detalle ? `<h3 style="color: #a54757;">${experiencia.detalle}</h3>` : ''} <br><br>
                    </div>
                `;
            });

            experienciaDiv.innerHTML = experienciaContent;
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

/*PARSEO: Cargar y usar el JSON desde un archivo externo*/
    fetch('experienciaLaboral.json') /*Solicita el archivo JSON*/
        .then(response => response.json()) /*Convierte la respuesta a un objeto JavaScript*/
        .then(data => { /*Usa los datos parseados*/
            createExperienciaLaboral(data.experiencias); /*Llama a la función para crear el contenido en el DOM*/
        })
        .catch(error => console.error('Error cargando los datos:', error)); /*Muestra errores*/

/*Experiencia laboral a partir del objeto JavaScript*/
    function createExperienciaLaboral(experiencias) {
        const experienciaLaboralDiv = document.getElementById('experiencia-laboral');
        experienciaLaboralDiv.innerHTML = ''; /*Limpia el contenido*/

/*Recorre cada experiencia laboral y crea elementos HTML para mostrar los datos*/
    experiencias.forEach(trabajo => {
        const p = document.createElement('p');
        const h3 = document.createElement('h3');
        h3.textContent = trabajo.titulo;

        p.appendChild(h3);
        p.innerHTML += `${trabajo.empresa} <br>
                        ${trabajo.sector} <br>
                        ${trabajo.periodo}<br>`;
        
        if (trabajo.detalle) {
            const extra = document.createElement('h3');
            extra.style.color = '#a54757';
            extra.textContent = trabajo.detalle;
            p.appendChild(extra);
        }

        p.innerHTML += '<br>';
        experienciaLaboralDiv.appendChild(p);
    }
)};
