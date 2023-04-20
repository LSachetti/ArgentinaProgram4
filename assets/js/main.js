"use strict";
jQuery(document).ready(function ($) {


    //==========================================
    //for Preloader
    //=========================================

    $(window).load(function () {
        $("#loading").fadeOut(500);
    });


    //==========================================
    // Mobile menu
    //=========================================
    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 80)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    //==========================================
    // wow
    //=========================================

    var wow = new WOW({
        mobile: false 
    });
    wow.init();


// =========================================
// magnificPopup
// =========================================

    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.video-link').magnificPopup({
        type: 'iframe'
    });


// =========================================
//      featured slider
// =========================================       


    $('.featured_slider').slick({
        centerMode: true,
        dote: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 1500,
        index: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });



// =========================================
// Counter
// =========================================   

    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });



// =========================================
// Scroll Up
// =========================================   

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


// =========================================
// About us accordion 
// =========================================   

    $("#faq_main_content").collapse({
        accordion: true,
        open: function () {
            this.addClass("open");
            this.css({height: this.children().outerHeight()});
        },
        close: function () {
            this.css({height: "0px"});
            this.removeClass("open");
        }
    });

// =========================================
// Team Skillbar active js
// =========================================   


    jQuery('.teamskillbar').each(function () {
        jQuery(this).find('.teamskillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });




    //End

});


// =========================================
//  Portfolio Isotop
// =========================================   

$(function () {
    // Initialize Isotope
    var $notes = $(".grid").isotope({
        itemSelector: ".grid-item"
    });

    // On filter button click
    $(".filters-button-group .button").on("click", function (e) {
        var $this = $(this);

        // Prevent default behaviour
        e.preventDefault();

        // Toggle the active class on the correct button
        $(".filters-button-group .button").removeClass("is-checked");
        $this.addClass("is-checked");

        // Get the filter data attribute from the button
        $notes.isotope({
            filter: $this.attr("data-filter")
        });

    });
});





const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
    var doc = new jsPDF(); 
    //var imgData = 'data:image/jpeg;base64,'+ Base64.encode('assets/images/comprapdf.jpeg');
    let total = 0;
    let cantidad = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
        '.shoppingCartItemPrice'
      );
      const shoppingCartItemPrice = Number(
        shoppingCartItemPriceElement.textContent.replace('$', '')
      );
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
        '.shoppingCartItemQuantity'
      );
      const shoppingCartItemQuantity = Number(
        shoppingCartItemQuantityElement.value
      );
      
      total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
        cantidad = cantidad + shoppingCartItemQuantity;
      
      //doc.text(20, 20, 'cantidad: '+ cantidad);
      
      
    });

    doc.text(80, 20, '¡Gracias por su compra!');
    doc.text(20, 50, 'Cantidad de items: '+ cantidad);
    doc.text(20, 60, 'Total de la compra: $' + total);


    
    //doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);

    doc.save('formulario.pdf');

 
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
};
$('#formularioContacto').validate({
    rules: {
        nombre: 'required',
        email: {
            required: true,
            email: true
        },
        mensaje: 'required'
    },
    messages: {
        nombre: 'Por favor ingrese su nombre',
        email: {
            required: 'Por favor ingrese su dirección de correo electrónico',
            email: 'Por favor ingrese una dirección de correo electrónico válida'
        },
        mensaje: 'Por favor ingrese un mensaje'
    },
    submitHandler: function(form) {
        // Obtener los valores de los campos del formulario
        var nombre = $('#nombre').val();
        var email = $('#email').val();

        // Hacer la petición AJAX para enviar los datos al servidor
        $.ajax({
            url: 'https://reqres.in/api/users?page=2', // URL de regres.in para la petición de contacto
            method: 'POST', // Método HTTP POST
            data: {
                name: nombre,
                email: email,
            },
            success: function(response) {
                // Aquí puedes manejar la respuesta del servidor si es necesario
                console.log('Éxito:', response);
                // Puedes mostrar un mensaje de éxito al usuario
                alert('¡Mensaje enviado con éxito!');
            },
            error: function(xhr, status, error) {
                // Aquí puedes manejar los errores de la petición AJAX si es necesario
                console.error('Error:', error);
                // Puedes mostrar un mensaje de error al usuario
                alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
            }
        });
    }
});