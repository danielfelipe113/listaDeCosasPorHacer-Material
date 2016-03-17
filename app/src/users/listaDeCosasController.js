(function(){
    angular
        .module("listaDeCosas", [])
        //Esta no es la mejor forma de escribir módulos adicionales, pero la usaremos por ahora para evitar confusiones con referencias a varios archivos
        .controller("listaDeCosasController", function($scope, $mdToast, $mdDialog){

            //Una lista temporal que se va a ver en el navegador
            //Para poder ver el estado completado la lista debe contener objetos en vez de strings simples.
            //Cada nuevo objeto contiene un string con el nombre de la tarea (Cosa por hacer) y su estado: completado o no completado como valor booleano (true o false)
            $scope.listaDeCosas = [
                { tarea: "Hacer diapositivas", completada: false },
                { tarea: "Comparar pan", completada: true },
                { tarea: "Pagar Internet", completada: false}
            ];

            $scope.agregarCosa = function(){
                //Si hay algo escrito en el campo de texto...
                if($scope.cosaNueva.length > 0){
                    //Agregarlo a la lista de cosas y...
                        //(Cada cosa nueva debe ser un objeto que sigue el patrón de $scope.listaDeCosa, debe tener las propiedades tarea  y completada)
                    $scope.listaDeCosas.push({tarea: $scope.cosaNueva, completada: false});
                    $scope.openToast($scope.cosaNueva + ' agregada correctamente')
                }
                //Borrar el contenido del campo de texto
                $scope.cosaNueva = "";
            };

            $scope.openToast = function(mensaje) {
                $mdToast.show($mdToast
                            .simple()
                            .position('bottom right')
                            .textContent(mensaje));
                // Could also do $mdToast.showSimple('Hello');
            };

            $scope.completar = function(cosa) {
                cosa.completada = true;
                $scope.openToast('¡' + cosa.tarea + ' completada!');
            };

            $scope.eliminar = function (cosa) {
                var confirm = $mdDialog.confirm()
                                        .title('¿Estas seguro que quieres eliminar: ' + cosa.tarea +'?')
                                        .ok('Eliminar')
                                        .cancel('Cancelar');

                $mdDialog.show(confirm).then(function(){
                    $scope.listaDeCosas.splice(cosa, 1);
                    $scope.openToast(cosa.tarea + ' eliminada correctamente.')
                });
            }

        })
})();