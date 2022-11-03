/* Update on: 03/10/2018 */

/*jslint browser: true */
/*jshint node: true */

'use strict'
window.unescape = window.unescape || window.decodeURI
window.pinker = (function($, unescape, undefined) {
	return {
		/*
        @desc Obtiene cookie desde el navegador.
        */
		getCookie: function(name) {
			var re = new RegExp(name + '=([^;]+)')
			var value = re.exec(document.cookie)
			return value != null ? unescape(value[1]) : null
		},

		/**
		 * Desplaza scroll sueve hasta div contenedor
		 * Desde href="#hola" hasta id="hola"
		 * @example pinker.goToScroll(200);
		 * @param {number} paddingTop [resta el espacio dado para q no se oculte con el header - Es opcional]
		 */
		goToScroll: function(paddingTop) {
			$('a[href^="#"]').on('click', function(e) {
				e.preventDefault()
				var target = this.hash
				var $target = $(target)
				$('html, body')
					.stop()
					.animate(
						{
							scrollTop: paddingTop ? $(target).offset().top - paddingTop : $(target).offset().top
						},
						900,
						'swing',
						function() {
							//window.location.hash = target
						}
					)
			})
		},

		/**
		 *  Recibe un string y lo devuelve sin tildes, espacios y en minúsculas
		 *  @param  {string} str [description]
		 *  @return {string}     ratoncurioso
		 *  @example limpiaString('Ratón-curioso');
		 */
		limpiaString: function(str) {
			var txtResult
			txtResult = str.replace(/,/g, '')
			txtResult = txtResult.replace(/-/g, '')
			txtResult = txtResult.toLowerCase()
			txtResult = txtResult.replace(/á/gi, 'a')
			txtResult = txtResult.replace(/é/gi, 'e')
			txtResult = txtResult.replace(/í/gi, 'i')
			txtResult = txtResult.replace(/ó/gi, 'o')
			txtResult = txtResult.replace(/ú/gi, 'u')
			txtResult = txtResult.replace(/ñ/gi, 'n')
			return txtResult
		},

		/**
		 * Compara 2 url de todas las formas posibles para ver si coinciden
		 * @param  {string} path1 /libreria/libros
		 * @param  {string} path2 /libreria/libros/
		 * @return {boolean}       true si coincide, false en otros casos
		 * @example globalDestacado().matchPathname('/libreria/libros', '/libreria/libros/');
		 */
		matchPathname: function(path1, path2) {
			if (path1.charAt(path1.length - 1) === '/') {
				path1 = path1.slice(0, -1)
			}

			if (path2.charAt(path2.length - 1) === '/') {
				path2 = path2.slice(0, -1)
			}

			if (path1 === path2) {
				return true
			}
			return false
		},

		/**
		 * Cuenta regresiva para campañas específicas. Éste se agrega en los banners principales
		 * @param  {string} elemento contenedor
		 * @param  {string} fecha límite
		 * @return {string} hora límite
		 * @example pinker.setTimerBanner('#wtimer', '2018-12-24', '22:30'); //remember the format is YYYY-MM-DD
		 */
		setTimerBanner: function(holder, dline, hourFinish = '23:59', textoTitle) {
			var bodyclock = '<h1>' + textoTitle + '</h1>' + '<div><span class="days"></span>' + '<div class="smalltext">DÍA</div></div>' + '<div><span class="hours"></span>' + '<div class="smalltext">HRS</div></div>' + '<div><span class="minutes"></span>' + '<div class="smalltext">MIN</div></div>' + '<div><span class="seconds"></span>' + '<div class="smalltext">SEG</div></div>'

			$(holder).append(bodyclock)

			var hEnd = hourFinish.split(':')
			var deadline = new Date(dline + ' ' + Number(hEnd[0]) + ':' + hEnd[1] + ':59').getTime()
			var x = setInterval(function() {
				var ahora = new Date().getTime()
				var t = deadline - ahora
				var days = Math.floor(t / (1000 * 60 * 60 * 24))
				var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
				var seconds = Math.floor((t % (1000 * 60)) / 1000)
				$('.days').html(days)
				$('.hours').html(hours)
				$('.minutes').html(minutes)
				$('.seconds').html(seconds)
				if (t < 0) {
					clearInterval(x)
					$('.days').html('0')
					$('.hours').html('0')
					$('.minutes').html('0')
					$('.seconds').html('0')
					// document.getElementById("demo").innerHTML = "TIME UP";
				}
			}, 1000)
			console.log('setTimerBanner:', dline, hourFinish, new Date().getTime())
			console.log('deadline: ' + deadline)
			console.log('days: ' + Math.floor((deadline - new Date().getTime()) / (1000 * 60 * 60 * 24)))
		},
		/**
		 * Cuenta regresiva para campañas específicas. Éste se agrega en los banners principales
		 * @param  {string} elemento contenedor
		 * @param  {string} fecha límite
		 * @param {string} hora límite
		 * @example pinker.setTimerBanner('#wtimer', '2018-12-24', '22:30'); //remember the format is YYYY-MM-DD
		 */
		timerSlider: function(holder, dline, hourFinish = '23:59') {
			/* var bodyclock = "<h1>Solo quedan:</h1>" + '<div><span class="days"></span>' + '<div class="smalltext">DÍA</div></div>' + '<div><span class="hours"></span>' + '<div class="smalltext">HRS</div></div>' + '<div><span class="minutes"></span>' + '<div class="smalltext">MIN</div></div>' + '<div><span class="seconds"></span>' + '<div class="smalltext">SEG</div></div>'; */

			var tempo = `<div class="metro-contador__item">
            <p class="metro-contador__numero days">00</p>
            <p class="metro-contador__texto">Días</p>
                </div>
                <div class="metro-contador__item metro-contador__item--dospuntos">
            <p>:</p>
            </div>
                <div class="metro-contador__item">
            <p class="metro-contador__numero hours">00</p>
            <p class="metro-contador__texto">Hrs</p>
            </div>
            <div class="metro-contador__item metro-contador__item--dospuntos">
            <p>:</p>
            </div>
            <div class="metro-contador__item">
            <p class="metro-contador__numero minutes">00</p>
            <p class="metro-contador__texto">Min</p>
            </div>
            <div class="metro-contador__item metro-contador__item--dospuntos">
            <p>:</p>
            </div>
            <div class="metro-contador__item">
            <p class="metro-contador__numero seconds">00</p>
            <p class="metro-contador__texto">Seg</p>
            </div>`

			$(holder).append(tempo)
			console.log('Timer: ' + holder + ' - ' + dline)

			var hEnd = hourFinish.split(':')
			var deadline = new Date(dline + ' ' + Number(hEnd[0]) + ':' + hEnd[1] + ':59').getTime()
			var x = setInterval(function() {
				var ahora = new Date().getTime()
				var t = deadline - ahora
				var days = Math.floor(t / (1000 * 60 * 60 * 24))
				var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
				var seconds = Math.floor((t % (1000 * 60)) / 1000)
				$(holder)
					.find('.days')
					.html(days < 10 ? '0' + days : days)
				$(holder)
					.find('.hours')
					.html(hours < 10 ? '0' + hours : hours)
				$(holder)
					.find('.minutes')
					.html(minutes < 10 ? '0' + minutes : minutes)
				$(holder)
					.find('.seconds')
					.html(seconds < 10 ? '0' + seconds : seconds)
				if (t < 0) {
					clearInterval(x)
					$(holder)
						.find('.days')
						.html('0')
					$(holder)
						.find('.hours')
						.html('0')
					$(holder)
						.find('.minutes')
						.html('0')
					$(holder)
						.find('.seconds')
						.html('0')
					// document.getElementById("demo").innerHTML = "TIME UP";
				}
			}, 1000)
			/* console.log('setTimerBanner:', dline, hourFinish, new Date().getTime())
			console.log('deadline: ' + deadline)
			console.log('days: ' + Math.floor((deadline - new Date().getTime()) / (1000 * 60 * 60 * 24))) */
		},
		/**
		 * Busca una palabra en una cadena de texto. Palabra por palabra previamente separada por el carater separador indicado
		 * @param  {string} palabra a buscar
		 * @param  {string} donde lo buscará
		 * @param  {string} caracter separador
		 * @return {boolean} true si encuentra la palabra
		 * @example pinker.buscaInString('vinos-y-licores', '/vinos-y-licores/whisky', '/');
		 */
		buscaInString: function(word, str, separador) {
			return str.split(separador).some(function(w) {
				return w === word
			})
		}
	}
})(window.jQuery, window.unescape)
/*
if ($("#home-page").length) {
    Swal.fire({
    imageUrl: 'https://wongfood.vteximg.com.br/arquivos/m05042022_900x560.jpg',
    heightAuto: true,
    width: 900,
    imageAlt: 'Comunicado',
    scrollbarPadding: false,
    padding: '0',
    showConfirmButton: false,
    showCloseButton: false,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showCloseButton: true,
    backdrop: false,
    timer: 300000
    });
    $(".swal2-image").css("margin", "0");
}*/