var app = angular.module('Jueguito', []);



// Minificación Segura
app.controller('Controlador', ['scope', function(scope) {

	scope.message = 'todo bien!';

	app.directive('jueguito', function(jueguitoEsquema) {
		return {
			restrict: 'AE',
			scope: {},
			templateUrl: 'plantillas/plantilla.html',
			link: function(scope, elem, attrs) {
				scope.empezar = function() {
					scope.id = 0;
					scope.seAcabo = false;
					scope.Avance = true;
					scope.obtienePregunta();
				};

				scope.reset = function() {
					scope.Avance = false;
					scope.puntaje = 0;
				}

				scope.obtienePregunta = function() {
					var q = jueguitoEsquema.obtienePregunta(scope.id);
					if(q) {
						scope.pregunta = q.pregunta;
						scope.opciones = q.opciones;
						scope.respuesta = q.respuesta;
						scope.modoRespuesta = true;
					} else {
						scope.seAcabo = true;
					}
				};

				scope.checkRespuesta = function() {
					if(!$('input[name=respuesta]:checked').length) return;

					var ans = $('input[name=respuesta]:checked').val();

					if(ans == scope.opciones[scope.respuesta]) {
						scope.puntaje++;
						scope.respCorrecta = true;
					} else {
						scope.respCorrecta = false;
					}

					scope.modoRespuesta = false;
				};

				scope.siguientePregunta = function() {
					scope.id++;
					scope.obtienePregunta();
				}

				scope.reset();
			}
		}
	});

	app.factory('jueguitoEsquema', function() {
		var preguntas = [
			{
				pregunta: "Cuánto es 2 + 2 ?",
				opciones: ["3", "8", "4", "1"],
				respuesta: 2
			},
			{
				pregunta: "Cuánto es 5 + 5 ?",
				opciones: ["98", "10", "2", "9"],
				respuesta: 1
			},
			{
				pregunta: "Cuánto vale Pi?",
				opciones: ["1", "0", "89798", "3,1416"],
				respuesta: 3
			}
		];

		return {
			obtienePregunta: function(id) {
				if(id < preguntas.length) {
					return preguntas[id];
				} else {
					return false;
				}
			}
		};
	});

}]); //Controlador