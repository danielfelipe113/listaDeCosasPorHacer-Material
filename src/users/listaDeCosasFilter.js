(function(){
    angular
        .module("listaDeCosas")
        .filter('sinCompletar', function(){
                    return function(input){
                        var sinCompletar = 0;
                        input.forEach(function(elemento){
                            if(elemento.completada === false){
                                sinCompletar += 1;
                            }
                        })

                        return sinCompletar;
                    };
                })
})();

