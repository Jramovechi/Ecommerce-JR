
class Productos {
    constructor (id, imagen, modelo, precio) {
        this.id= id;
        this.imagen = imagen;
        this.modelo = modelo;
        this.precio = precio;
    }
}

//Animacion con FADE IN + FADE OUT

$("#btnInfo").click(function() {

    $("#contenedor__info")  .fadeIn(1000)
                            .fadeOut(4000);
    
    });

$("#btnInfo1").click(function() {

    $("#contenedor__info1")  .fadeIn(1000)
                            .fadeOut(4000);
    
    });

$("#btnInfo2").click(function() {

    $("#contenedor__info2")  .fadeIn(1000)
                            .fadeOut(4000);
    
    });


// Doy de Alta los Productos
const productosStock = [ {id:1, imagen:"procesador-i5.webp", modelo:"Procesador I5", precio:10000 },
                    {id:2, imagen:"procesador-i7.webp", modelo:"Procesador I7", precio:15000 },
                    {id:3, imagen:"procesador-i9.webp", modelo:"Procesador I9", precio:20000 },
                    {id:4, imagen:"motherboard-i5.webp", modelo:"MotherBoard I5", precio:8000 },
                    {id:5, imagen:"motherboard-i7-2.webp", modelo:"MotherBoard I7", precio:11000 },
                    {id:6, imagen:"motherboard-i9.webp", modelo:"MotherBoard I9", precio:18000 },
                    {id:7, imagen:"gabinete-1.webp", modelo:"Gabinete Sentey1", precio:4500 },
                    {id:8, imagen:"gabinete-2.webp", modelo:"Gabinete Sentey2", precio:5000 },
                    {id:9, imagen:"gabinete-3.webp", modelo:"Gabinete Sentey3", precio:8000 },
                    {id:10, imagen:"producto1.webp", modelo:"PC Completa I5", precio:85000 },
                    {id:11, imagen:"producto2.webp", modelo:"PC Completa I7", precio:115000 },
                    {id:12, imagen:"producto3.webp", modelo:"PC Completa 9", precio:200000 }
                    ];



//Funcion para recorrer los productos del LocalStorage
function buscarProducto(id) {
    var contenedor_productos = productosStock;

    return contenedor_productos.find(x => x.id == id); // Recorre la constante productosStock y obtiene los productos por su ID

}


//Funcion para seleccionar Productos y agregarlos al "carrito"
function armarCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    let producto_carrito = buscarProducto(id);
    
    carrito.push(producto_carrito); // Llama a la funcion "buscarProducto" y agrega cada producto al Carrito

    // Agrega productos a nuestro carrito en nuesto HTML 
    $("tbody").append(`<tr scope="row"> 
                                    <td>
                                        <img class="w-50" src="imgs/${producto_carrito.imagen}">
                                    </td>
                                    <td>${producto_carrito.modelo}</td>
                                    <td>$ ${producto_carrito.precio}</td>
                                    <td>
                                        <a href="#" class="borrar-producto bi bi-x-circle c-amarillo" data-id="${producto_carrito.id}"></a>
                                    </td>
                                </tr>

            `);
    $("#carrito").css("width","450px");

        
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos productos del carrito en nuestro localStorage 
    console.log("Estado del Carrito:"); // Mostramos productos del carrito en consola 
    console.log(JSON.parse(localStorage.getItem("carrito"))); // Mostramos productos del carrito en consola
    precioFinal();
}

//Funcion Total de carrito
function precioFinal() {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    let productosElegidos = "";
    var precioTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        productosElegidos += "-" + carrito[i].modelo + "  $" + carrito[i].precio + '<br>';
        precioTotal += carrito[i].precio;
    }

    $(".listaCompras").empty().append(` <div id="listaDeJS">
                                                <h3>Pedido: </h3>
                                                <p>${productosElegidos}</p>  
                                            </div>`);

    $(".resumen").empty().append(`<div id="precioDeJS">
                                        <h3>Resumen: </h3>
                                            <p> Efectivo o débito: <br> <span> $${precioTotal} </span> </p>  <br>
                                            <p> Tarjeta de crédito(+20%): <br> <span> $${precioTotal * 1.20}</span> </p>
                                    </div>`);

    $("#cantProductos").empty().append(carrito.length);
}


// Funcion Vaciar Carrito 
function vaciarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    //Verificamos que si no hay productos en nuestro carrito da "alerta de pedido no realizado"
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'warning',
            iconColor:'#E0FF00',
            title: 'Oops...',
            text: 'Todavía no ha realizado ningún pedido.',
            timer: 2000,
            showConfirmButton: false
        })
    
    //Verificamos que si hay productos en nuestro carrito da "alerta de pedido borrado"
    }else {
        Swal.fire({
            title:'PEDIDO CANCELADO',
            confirmButtonText: 'OK',
            confirmButtonColor: '#E0FF00'
        })
        carrito.splice(0, carrito.length + 1);
        $("tbody").empty(); // Limpia nuesto HTML Carrito
        $(".listaCompras").empty(); // Limpia nuesto HTML Carrito
        $(".resumen").empty(); // Limpia resumen de nuesto HTML Carrito
        $("#cantProductos").empty(); // Limpia cantidad de productos de nuesto HTML Carrito

        localStorage.clear(); // Vacia nuestro LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda nuevamente nuestro Carrito al LocalStorage

        $("#cantProductos").append(carrito.length); // Actualiza cantidad de productos en nuestro CARRITO
    }
}

// FUNCION BOTON REALIZAR PEDIDO
$("#procesar-pedido").click(function realizarPedido() {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    
        //Verificamos que si no hay productos en nuestro carrito da "alerta de pedido no realizado"
        if (carrito.length == 0) {
            Swal.fire({
                icon: 'warning',
                iconColor:'#E0FF00',
                title: 'Oops...',
                text: 'Todavía no ha realizado ningún pedido.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#E0FF00'
            });

            $("tbody").empty();
        
        //Verificamos que si hay productos en nuestro carrito da "alerta para confirmar pedido"    
        } else {
            Swal.fire({
                title: 'Confirmar pedido',
                text: "Una vez que confirme empezaremos a preparar su pedido!",
                icon: 'question',
                iconColor:'#E0FF00',
                showCancelButton: true,
                confirmButtonColor: '#E0FF00',
                cancelButtonColor: '#E0FF00',
                allowOutsideClick: false,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar !'
            
            //Si confirmamos nos arroja alerta con aviso de preparacion de pedido
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title:'Pedido realizado!',
                        text:'Su pedido está en preparación.',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#E0FF00'

                    })
                    carrito.splice(0, carrito.length + 1);
                    $("tbody").empty(); // Limpia nuesto HTML Carrito
                    $(".listaCompras").empty(); // Limpia nuesto HTML Carrito
                    $(".resumen").empty(); // Limpia resumen de nuesto HTML Carrito
                    $("#cantProductos").empty(); // Limpia cantidad de productos de nuesto HTML Carrito

                    
                }

                localStorage.clear(); // Vacia nuestro LocalStorage
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda nuevamente nuestro Carrito al LocalStorage
                $("#cantProductos").append(0); // Actualiza cantidad de productos en nuestro CARRITO
            });
        }


});


localStorage.clear();
localStorage.setItem("contenedor_productos", JSON.stringify(productosStock));
localStorage.setItem("carrito", JSON.stringify([]));
