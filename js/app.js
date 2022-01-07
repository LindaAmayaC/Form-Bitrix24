/* Se declaran variables que contienen el codigo de cada casilla nueva para agregar un producto  */
var agregarProductofila1 = 
    '<input id="nombre_producto" class="col-sm-4 inputList nombre_producto" style="background-color:#eff1f8;"></input>';
var agregarProductofila2 =
    '<input id="cant_producto" class="col-sm-4 inputList cant_producto" style="background-color:#eff1f8;"></input>';
var agregarProductofila3 =    
    '<input id="valor_producto" class="col-sm-4 inputList valor_producto" style="background-color:#eff1f8;"></input>'; 
    
/* Inicializar bitrix24 API */
function initializeApp(){
    $("#btn-AggProducto").click(accionBtnAggProducto()); 
    $("#btn-Enviar").click(accionBotonEnviar()); 
    
} 
 /* Accion botron agregar producto */
function accionBtnAggProducto(){
    
    /* Pinta una fila para agregar productos nueva */
    $(".row").append(agregarProductofila1);
    $(".row").append(agregarProductofila2);
    $(".row").append(agregarProductofila3); 
    
}
/* Accion boton enviar */
function accionBotonEnviar(){
    enviarCamposABitrix();
} 
/* function accionBtnDeleteProducto(){
    $("#inputList").remove().last();
    $("#inputList").remove().last();
    $("#inputList").remove().last();
} */
/* Funcion que envia los datos capturados del formulario a campos  correspondientes en Bitrix24 */
function enviarCamposABitrix(){
    var num_solicitud = document.getElementById("num_solicitud").value;
    var nombre_proveedor = document.getElementById("nombre_proveedor").value;
    var cond_Pago = document.getElementById("cond_Pago").value;
    var nombre_producto = retornaArregloNombreProducto(document.getElementsByClassName("nombre_producto"));
    var cant_producto = retornaArregloCantProducto(document.getElementsByClassName("cant_producto"));
    var valor_producto = retornaArregloValorProducto(document.getElementsByClassName("valor_producto"));
    
    BX24.callMethod(
        "crm.item.add", { entityTypeId: 180, 
            "fields": {
                "ufCrm40_1640695319564": nombre_producto,
                "ufCrm40_1640695367517": cant_producto,
                "ufCrm40_1640695391503" : valor_producto,
                "ufCrm40_1640695479748": nombre_proveedor,
                "ufCrm40_1640695541215": cond_Pago
            }
        },
        function (result) {
            console.log("entro a todos los procesos");
            if (result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
     
    
}
/* funcion que retorna un array con todos los nombres de productos agregados */
function retornaArregloNombreProducto(nombreProducto){

    var arregloNombreProducto = [];

    for(i=0 ; i< nombreProducto.length; i++){
        arregloNombreProducto.push(nombreProducto[i].value);
    }
    
    return arregloNombreProducto;
}
/* funcion que retorna array con la cantidad de los productos agregados */
function retornaArregloCantProducto(cantProducto){
    
    var arregloCantProducto = [];

    for(i=0 ; i< cantProducto.length; i++){
        arregloCantProducto.push(cantProducto[i].value);
    }
    
    return arregloCantProducto;
}
/* funcion que retorna un array con el calor de cada producto agregado  */
function retornaArregloValorProducto(valorProducto){

    var arregloValorProducto = [];

    for(i=0 ; i< valorProducto.length; i++){
        arregloValorProducto.push(valorProducto[i].value);
    }
    
    return arregloValorProducto;
}