(function () {
    angular
        .module('directives')
        .directive('addCustomer', AddCustomer);

    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/components/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.add = function(){
                    $http({
                        method: 'POST',
                        url: '/api/customer/add',
                        data: scope.customer

                    }).then(function(res){
                        scope.onAdded()();
                        scope.customer = {};
                    });
                };
            }
        };
    }

})();

