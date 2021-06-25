class Logica implements EventListenerObject {

    static listaVehiculos: Array<Vehiculo> = new Array<Vehiculo>();
    static listaCompletaAux: Array<Vehiculo> = new Array<Vehiculo>();

    handleEvent(evt: Event): void {
        let iniciador: HTMLElement = <HTMLElement>evt.target;
        switch (iniciador.id) {
            case "btnAgregar":
                (<HTMLElement>document.getElementById("divAgregar")).hidden = false;
                break;
            case "btnGuardar":
                this.AgregarVehiculo();
                this.MostrarVehiculos();
                break;
            case "btnCancelar":
                (<HTMLElement>document.getElementById("divAgregar")).hidden = true;
                Logica.LimpiarCampos();
                break;
            case "btnPromedio":
                this.PromediarPrecios();
                break;
            /* case "checkId":
            case "checkMarca":
            case "checkModelo":
            case "checkPrecio":
                this.FiltrarLista();
                break; */

        }
    }

    AgregarVehiculo()
    {
        
        let marca = (<HTMLInputElement>document.getElementById("txtMarca")).value;
        let modelo = (<HTMLInputElement>document.getElementById("txtModelo")).value;
        let precio = (Number)((<HTMLInputElement>document.getElementById("txtPrecio")).value);
        let id:number;
        //Set ID
        if(Logica.listaVehiculos.length == 1)
        {
            id = 1;     
        }
        else
        {
            id = Logica.listaVehiculos.reduce(function (max, item)
            {
                if(item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
        }
        let idProximo = id+1;
        (<HTMLInputElement>document.getElementById("txtId")).value = idProximo.toString();
        //Construccion y adición a la lista.
        if((<HTMLInputElement>document.getElementById("slcTipo")).value == "Camioneta")
        {
            let es4x4:boolean = (<HTMLInputElement>document.getElementById("check4x4")).checked;
           let nuevaCamioneta:Camioneta = new Camioneta(id, marca, modelo, precio, es4x4);
           Logica.listaVehiculos.push(nuevaCamioneta);
        }
        else if((<HTMLInputElement>document.getElementById("slcTipo")).value == "Auto")
        {
            let cantidadPuertas:number = (Number)((<HTMLInputElement>document.getElementById("txtCantidadPuertas")).value);
            let nuevoAuto:Auto = new Auto(id, marca, modelo, precio, cantidadPuertas);
            Logica.listaVehiculos.push(nuevoAuto);
        }
        (<HTMLElement>document.getElementById("divAgregar")).hidden = true;
        Logica.LimpiarCampos();
        
    }

    /* FiltrarLista()
    {
        let checkId = <HTMLInputElement>document.getElementById("checkId");
        let checkMarca = <HTMLInputElement>document.getElementById("checkMarca");
        let checkModelo = <HTMLInputElement>document.getElementById("checkModelo");
        let checkPrecio = <HTMLInputElement>document.getElementById("checkPrecio");
        
        let listaNueva;

        if(!checkId.checked)
        {
            Logica.listaCompletaAux = Logica.listaVehiculos;
            Logica.listaVehiculos = Logica.listaVehiculos.filter(function(vehiculo)
            {
                
            });
        }
    } */

    static LimpiarCampos()
    {
        (<HTMLInputElement>document.getElementById("txtMarca")).value = "";
        (<HTMLInputElement>document.getElementById("txtModelo")).value ="";
        (<HTMLInputElement>document.getElementById("txtPrecio")).value="";
        (<HTMLInputElement>document.getElementById("slcTipo")).value="";
    }

    MostrarVehiculos()
    {
        
        var cuerpo = <HTMLElement>document.getElementById("tblCuerpo");
        while (cuerpo.firstChild) {
            cuerpo.removeChild(cuerpo.firstChild);
        }

        Logica.listaVehiculos.forEach(vehiculo => {

            /* Creo el <tr> */
            var row = document.createElement("tr");
            cuerpo.appendChild(row);
            /* Creo el <td> y se lo adjunto al <tr>, luego le adjunto el nombre al <td> */

            var tdId = document.createElement("td");
            row.appendChild(tdId);
            var textoId = document.createTextNode(vehiculo.id.toString());
            tdId.appendChild(textoId);


            var tdMarca = document.createElement("td");
            row.appendChild(tdMarca);
            var textoMarca = document.createTextNode(vehiculo.marca);
            tdMarca.appendChild(textoMarca);

            var tdModelo = document.createElement("td");
            row.appendChild(tdModelo);
            var textoModelo = document.createTextNode(vehiculo.modelo   );
            tdModelo.appendChild(textoModelo);

            var tdPrecio = document.createElement("td");
            row.appendChild(tdPrecio);
            var textoPrecio = document.createTextNode(vehiculo.precio.toString());
            tdPrecio.appendChild(textoPrecio);

            var tdBorrar = document.createElement("td");
            row.appendChild(tdBorrar);
            var aBorrar = document.createElement("a");
            tdBorrar.appendChild(aBorrar);
            aBorrar.setAttribute("href", "#");
            var textoBorrar = document.createTextNode("Borrar");
            aBorrar.appendChild(textoBorrar);


            aBorrar.addEventListener("click", this.EliminarVehiculo);
            row.setAttribute("id", vehiculo.id.toString())
            aBorrar.setAttribute("id", vehiculo.id.toString());
        });
    }

    EliminarVehiculo(evt:Event)
    {
        //Borro de la tabla
        let idVehiculo = (evt.target).id; //No se porque muestra error a veces, pero funciona.
        let row = <HTMLElement>document.getElementById(idVehiculo);
        row.remove(); 
        //Borro de la lista
        Logica.listaVehiculos = Logica.listaVehiculos.filter(function (vehiculo) {
            if (vehiculo.id != idVehiculo) {
                return vehiculo;
            }
        });

    }

    PromediarPrecios()
    {
        //Saco el promedio
        let numTotal = Logica.listaVehiculos.reduce((total, b) => total = total + b.precio, 0);
        let promedio = numTotal / Logica.listaVehiculos.length;
        //Lo pongo en el input
        if(isNaN(promedio))
        {
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = "No hay vehiculos";
        }
        else
        {
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = promedio.toString();

        }
    }

}

window.addEventListener("load", cargar);

function cargar() {
    //Objeto clase Logica
    let logica: Logica = new Logica();

    //Botones con addEventListener
    let btnAgregar = <HTMLInputElement>document.getElementById("btnAgregar");
    let btnGuardar = <HTMLInputElement>document.getElementById("btnGuardar");
    let btnCancelar = <HTMLInputElement>document.getElementById("btnCancelar");
    let btnPromedio = <HTMLInputElement>document.getElementById("btnPromedio");
    btnPromedio.addEventListener("click", logica);
    btnAgregar.addEventListener("click", logica);
    btnGuardar.addEventListener("click", logica);
    btnCancelar.addEventListener("click",logica);

    //Tipos con addEventListener
    let slcTipo = <HTMLInputElement>document.getElementById("slcTipo");
    slcTipo.addEventListener("change", DarOpciones);

    //Checkbox con addEventListener
    let checkId = <HTMLInputElement>document.getElementById("checkId");
    let checkMarca = <HTMLInputElement>document.getElementById("checkMarca");
    let checkModelo = <HTMLInputElement>document.getElementById("checkModelo");
    let checkPrecio = <HTMLInputElement>document.getElementById("checkPrecio");
    checkId.addEventListener("change", logica);
    checkMarca.addEventListener("change", logica);
    checkModelo.addEventListener("change", logica);
    checkPrecio.addEventListener("change", logica);

}

function DarOpciones()
{
    let tipo = (<HTMLInputElement>document.getElementById("slcTipo")).value;
    if(tipo == "Camioneta")
    {
        (<HTMLInputElement>document.getElementById("lbl4x4")).hidden = false;
        (<HTMLInputElement>document.getElementById("check4x4")).hidden = false;
        (<HTMLInputElement>document.getElementById("lblCantidadPuertas")).hidden = true;
        (<HTMLInputElement>document.getElementById("txtCantidadPuertas")).hidden = true;
    }
    if(tipo == "Auto")
    {
        (<HTMLInputElement>document.getElementById("lbl4x4")).hidden = true;
        (<HTMLInputElement>document.getElementById("check4x4")).hidden = true;
        (<HTMLInputElement>document.getElementById("lblCantidadPuertas")).hidden = false;
        (<HTMLInputElement>document.getElementById("txtCantidadPuertas")).hidden = false;
    }
}
