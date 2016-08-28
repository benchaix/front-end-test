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

                scope.addCustomer = function(){

                }
            }
        }
    }

})()

