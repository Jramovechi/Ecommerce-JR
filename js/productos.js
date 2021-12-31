
//Agrego productos desde JSON a mi HTML con AJAX>GET "sección INDEX"

$(document).ready(() => {
    $.ajax({
        method: "GET",
        url: "js/datos.json",
        success: function(respuesta) {
            let max = 9;
            for (let producto of respuesta) {
                if (max > 0) {
                    $("#productos").append(`<div class="col-12 col-lg-4">
                                                <div class="card d-flex flex-column justify-content-center align-items-center justify-content-lg-evenly mt-5 borderShadow w-75 mx-5 mx-lg-0">
                                                    <img id="modelo__img" src="imgs/${producto.imagen}"  class="card-img-top img__card" alt="${producto.modelo}">
                                                    <div class="card-body d-flex flex-column justify-content-center border-top mt-1">
                                                        <div>
                                                            <h5 id="modelo__producto${producto.id}" class="text-center fw-bold">${producto.modelo}</h5>
                                                        </div>
                                                        <p class="text-center">Precio: <strong id="modelo__precio"> $ ${producto.precio}</strong></p>
                                                        <button id="btn-${producto.id}" class="btn boton bg-amarillo btn-${producto.id}">Añadir al carrito</button>   
                                                    </div>
                                                </div>
                                            </div>
                                            `);
                        
                        ///Asociamos el evento a botón recién creado.
                        $(`#btn-${producto.id}`).on('click', function() {
                            armarCarrito(producto.id);
                        });

                        max--; 
                    }else {
                        break;
                    } 

                }
            }
        
    });
})


//Agrego productos desde JSON a mi HTML  con AJAX>GET "sección SHOP"
$(document).ready(() => {
    $.ajax({
        method: "GET",
        url: "js/datos.json",
        success: function(respuesta) {
            let max = 12;
            for (let producto of respuesta) {
                if (max > 0) {
                    $("#productos__shop").append(`<div class="col-12 col-lg-4">
                                                <div class="card d-flex flex-column justify-content-center align-items-center justify-content-lg-evenly mt-5 borderShadow w-75 mx-5 mx-lg-0">
                                                    <img id="modelo__img" src="imgs/${producto.imagen}"  class="card-img-top img__card" alt="${producto.modelo}">
                                                    <div class="card-body d-flex flex-column justify-content-center border-top mt-1">
                                                        <div>
                                                            <h5 id="modelo__producto${producto.id}" class="text-center fw-bold">${producto.modelo}</h5>
                                                        </div>
                                                        <p class="text-center">Precio: <strong id="modelo__precio"> $ ${producto.precio}</strong></p>
                                                        <button id="btn${producto.id}" class="btn boton bg-amarillo btn-${producto.id}">Añadir al carrito</button>   
                                                    </div>
                                                </div>
                                            </div>
                                            `);

                        ///Asociamos el evento a botón recién creado.
                        $(`#btn${producto.id}`).on('click', function() {
                            armarCarrito(producto.id);
                        });

                        max--; 
                    }else {
                        break;
                    } 

                }
            }
        
    });
})