// Selectores
const paciente= document.querySelector('#paciente')
const propietario= document.querySelector('#propietario')
const email= document.querySelector('#email')
const fecha= document.querySelector('#fecha')
const sintomas= document.querySelector('#sintomas')

const formulario = document.querySelector('#formulario-cita')
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]')
const contenedorCitas = document.querySelector('#citas')
const btnEditar= document.querySelector('.btn-editar')
let editando= false


const citasObj={
    paciente:'',
    propietario:'',
    email:'',
    fecha:'',
    sintomas:'',
    id:generarId()
}


// clases

class Administrador{
    constructor(){
        this.citas=[]
    }

    //CRUD...............................................................
    agregar(citas){
        this.citas.push(citas)
        console.log(this.citas)
        
        this.mostrar()
    }
    mostrar() {

        // Limpiar el HTML
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
        if(this.citas.length === 0) {
            contenedorCitas.innerHTML = '<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>'
            return
        }

        // Gen


        // Generando las citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            // Botones de Eliminar y editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700','text-white',
                 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');

            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone= {...cita}
            btnEditar.onclick=()=>cargarEdicion(clone)

            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick=()=>this.eliminar(cita.id)


            const contenedorBotones = document.createElement('DIV')
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10')

            contenedorBotones.appendChild(btnEditar)
            contenedorBotones.appendChild(btnEliminar)
        
            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones)
            contenedorCitas.appendChild(divCita);
        });  
    } 
    editar(citaActualizada){
        this.citas= this.citas.map(cita=> cita.id===citaActualizada.id? citaActualizada: cita)
        this.mostrar()
        
    }
    eliminar(id){
        this.citas= this.citas.filter(cita=> cita.id!==id)
        this.mostrar()
    }

}
class UI{
    constructor({texto, tipo}) {
        this.texto = texto
        this.tipo = tipo
        this.alerta()
    }
    alerta(){
           // Crear la notificacion
           const alerta = document.createElement('DIV')
           alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm')
   
           // Eliminar alertas duplicadas
           const alertaPrevia = document.querySelector('.alert')
           alertaPrevia?.remove()
   
           // Si es de tipo error, agrega una clase
           this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500')
   
           // Mensaje de error
           alerta.textContent = this.texto
   
           // Insertar en el DOM
           formulario.parentElement.insertBefore(alerta, formulario)
   
           // Quitar después de 5 segundos
           setTimeout(() => {
               alerta.remove()
           }, 3000);
       }
}




// Instancias
const administrador= new Administrador


// Eventos
document.addEventListener('DOMContentLoaded',()=>{
paciente.addEventListener('change', datosCita)
propietario.addEventListener('change', datosCita)
email.addEventListener('change', datosCita)
fecha.addEventListener('change', datosCita)
sintomas.addEventListener('change', datosCita)

formulario.addEventListener('submit', validarForm)


})


// Funciones
function datosCita(e){
    citasObj[e.target.name]=e.target.value
}
function validarForm(e){
    e.preventDefault();
    console.log(citasObj)

    if(Object.values(citasObj).some(valor=> valor.trim()==='')){
        new UI({
            texto:'Todos los campos son obligatorios',
            tipo:'error'
        })
        
        return
    }

    if(editando){

        administrador.editar({...citasObj})
        new UI({
            texto:'Cita editada correctamente',
            tipo:'succes'
        })
    }
    else{
        administrador.agregar({...citasObj})
        new UI({
            texto:'Cita agregada correctamente',
            tipo:'succes'
        })
    }
    formulario.reset()
    resetearOBJ()
    formularioInput.value='Registrar Paciente'
    editando= false

    
}
function resetearOBJ(){

    Object.assign(citasObj, {
        id:generarId(),
        paciente:'',
        propietario:'',
        email:'',
        fecha:'',
        sintomas:''
    })
}
function generarId(){
    return Math.random().toString(36).substring(2) + Date.now()
    
}
function cargarEdicion(cita){
    Object.assign(citasObj, cita)
    
    paciente.value= cita.paciente
    propietario.value= cita.propietario
    email.value= cita.email
    fecha.value= cita.fecha
    sintomas.value= cita.sintomas
    
    editando=true
    formularioInput.value='Guardar cambios'

}
