var Logica = /** @class */ (function () {
    function Logica() {
    }
    Logica.prototype.handleEvent = function (evt) {
        var iniciador = evt.target;
        switch (iniciador.id) {
            case "btnAgregar":
                document.getElementById("divAgregar").hidden = false;
                break;
            case "btnGuardar":
                this.AgregarVehiculo();
                this.MostrarVehiculos();
                break;
            case "btnCancelar":
                document.getElementById("divAgregar").hidden = true;
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
    };
    Logica.prototype.AgregarVehiculo = function () {
        var marca = document.getElementById("txtMarca").value;
        var modelo = document.getElementById("txtModelo").value;
        var precio = (Number)(document.getElementById("txtPrecio").value);
        var id;
        //Set ID
        if (Logica.listaVehiculos.length == 1) {
            id = 1;
        }
        else {
            id = Logica.listaVehiculos.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
        }
        var idProximo = id + 1;
        document.getElementById("txtId").value = idProximo.toString();
        //Construccion y adición a la lista.
        if (document.getElementById("slcTipo").value == "Camioneta") {
            var es4x4 = document.getElementById("check4x4").checked;
            var nuevaCamioneta = new Camioneta(id, marca, modelo, precio, es4x4);
            Logica.listaVehiculos.push(nuevaCamioneta);
        }
        else if (document.getElementById("slcTipo").value == "Auto") {
            var cantidadPuertas = (Number)(document.getElementById("txtCantidadPuertas").value);
            var nuevoAuto = new Auto(id, marca, modelo, precio, cantidadPuertas);
            Logica.listaVehiculos.push(nuevoAuto);
        }
        document.getElementById("divAgregar").hidden = true;
        Logica.LimpiarCampos();
    };
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
    Logica.LimpiarCampos = function () {
        document.getElementById("txtMarca").value = "";
        document.getElementById("txtModelo").value = "";
        document.getElementById("txtPrecio").value = "";
        document.getElementById("slcTipo").value = "";
    };
    Logica.prototype.MostrarVehiculos = function () {
        var _this = this;
        var cuerpo = document.getElementById("tblCuerpo");
        while (cuerpo.firstChild) {
            cuerpo.removeChild(cuerpo.firstChild);
        }
        Logica.listaVehiculos.forEach(function (vehiculo) {
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
            var textoModelo = document.createTextNode(vehiculo.modelo);
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
            aBorrar.addEventListener("click", _this.EliminarVehiculo);
            row.setAttribute("id", vehiculo.id.toString());
            aBorrar.setAttribute("id", vehiculo.id.toString());
        });
    };
    Logica.prototype.EliminarVehiculo = function (evt) {
        //Borro de la tabla
        var idVehiculo = (evt.target).id; //No se porque muestra error a veces, pero funciona.
        var row = document.getElementById(idVehiculo);
        row.remove();
        //Borro de la lista
        Logica.listaVehiculos = Logica.listaVehiculos.filter(function (vehiculo) {
            if (vehiculo.id != idVehiculo) {
                return vehiculo;
            }
        });
    };
    Logica.prototype.PromediarPrecios = function () {
        //Saco el promedio
        var numTotal = Logica.listaVehiculos.reduce(function (total, b) { return total = total + b.precio; }, 0);
        var promedio = numTotal / Logica.listaVehiculos.length;
        //Lo pongo en el input
        if (isNaN(promedio)) {
            document.getElementById("txtPromedio").value = "No hay vehiculos";
        }
        else {
            document.getElementById("txtPromedio").value = promedio.toString();
        }
    };
    Logica.listaVehiculos = new Array();
    Logica.listaCompletaAux = new Array();
    return Logica;
}());
window.addEventListener("load", cargar);
function cargar() {
    //Objeto clase Logica
    var logica = new Logica();
    //Botones con addEventListener
    var btnAgregar = document.getElementById("btnAgregar");
    var btnGuardar = document.getElementById("btnGuardar");
    var btnCancelar = document.getElementById("btnCancelar");
    var btnPromedio = document.getElementById("btnPromedio");
    btnPromedio.addEventListener("click", logica);
    btnAgregar.addEventListener("click", logica);
    btnGuardar.addEventListener("click", logica);
    btnCancelar.addEventListener("click", logica);
    //Tipos con addEventListener
    var slcTipo = document.getElementById("slcTipo");
    slcTipo.addEventListener("change", DarOpciones);
    //Checkbox con addEventListener
    var checkId = document.getElementById("checkId");
    var checkMarca = document.getElementById("checkMarca");
    var checkModelo = document.getElementById("checkModelo");
    var checkPrecio = document.getElementById("checkPrecio");
    checkId.addEventListener("change", logica);
    checkMarca.addEventListener("change", logica);
    checkModelo.addEventListener("change", logica);
    checkPrecio.addEventListener("change", logica);
}
function DarOpciones() {
    var tipo = document.getElementById("slcTipo").value;
    if (tipo == "Camioneta") {
        document.getElementById("lbl4x4").hidden = false;
        document.getElementById("check4x4").hidden = false;
        document.getElementById("lblCantidadPuertas").hidden = true;
        document.getElementById("txtCantidadPuertas").hidden = true;
    }
    if (tipo == "Auto") {
        document.getElementById("lbl4x4").hidden = true;
        document.getElementById("check4x4").hidden = true;
        document.getElementById("lblCantidadPuertas").hidden = false;
        document.getElementById("txtCantidadPuertas").hidden = false;
    }
}
