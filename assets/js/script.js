let idTarea = 4;

const tareas = [
    {
        id: 1,
        descripcion: 'Realizar tareas de desafio',
        completado: false
    },
    {
        id: 2,
        descripcion: 'Tarea a realizar en 3 semanas',
        completado: false
    },
    {
        id: 3,
        descripcion: 'Revisar la documentación',
        completado: false
    }
]

const agregarTarea = function () {
    const nuevoNombre = document.getElementById('nuevaTarea').value; // input
    const objetoTarea = {
        id: idTarea,
        descripcion: nuevoNombre,
        completado: false
    }
    const alerta = document.getElementById('txtAlert')
   
    if (nuevoNombre !== '') {
        alerta.innerHTML = ''
        tareas.push(objetoTarea);
        idTarea++;
        document.getElementById('nuevaTarea').value = ''
        //Al agregar un elemento, actualiza la pantalla
        renderizarDatos();
    } else {
        alerta.innerHTML = `*** Defina nombre de la tarea ***`
        alerta.style.color = 'red'
    }
}

const eliminarElementoPorId = function (id) {
    const posicion = tareas.findIndex((obj) => {
        if (obj.id === id) {
            return true;
        }
        return false;
    });
    tareas.splice(posicion, 1);
    renderizarDatos();
}

const actualizarConfirmacion = function (id) {
    const posicion = tareas.findIndex((obj) => {    
        if (id === obj.id) {
            return true;
        }
        return false;
    } );
    tareas[posicion].completado = !tareas[posicion].completado;
    renderizarDatos();
}

const renderizarDatos = function () {
    const lista = document.getElementById('tareas');
    const totalTareas = document.getElementById('total')
    const totalCheck = document.getElementById('realizadas')
    let html = '';
    let num_cheq = 0;
    
    for (const tarea of tareas) {
        let realizado = ''
        if (tarea.completado) {
            chequeado = 'checked'; 
            realizado = ' - Realizado'
            num_cheq = num_cheq + 1;
        } else {
            chequeado = '';
        }

        html += `
        <div class="lineaTarea">
            <div class="idTarea">
                <strong>${tarea.id}</strong>
            </div>
            <div class="nombreTarea">
                <strong>${tarea.descripcion} ${realizado}</strong>
            </div>
            <div class="statusTarea">
                <input onclick="actualizarConfirmacion(${tarea.id})" type="checkbox" ${chequeado}>
            </div>
            <div class="accionTarea">
                <button onclick="eliminarElementoPorId(${tarea.id})" class="btn-elimina">X</button>
            </div>
        </div>`;
    }

    total = tareas.length; 
    totalTareas.innerHTML = `Total: ${total}`
    lista.innerHTML = html;
    totalCheck.innerHTML = `Realizadas: ${num_cheq}`;
}

//Carga inicial
renderizarDatos();
