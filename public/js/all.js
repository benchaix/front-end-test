(function() {
    angular.module('qudini.QueueApp', []);

})();
(function () {

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    angular.module('qudini.QueueApp')
        .directive("customer", ["$http", "$interval", function($http, $interval) {

        return{
            restrict: 'E',
            scope:{
                customer: '=',

                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/components/customer/customer.html',
            link: function(scope){

                var setIsServed = function(){
                    scope.isServed = scope.customer.status === 'served';
                };

                var setWaitingQueueTime = function(){
                    var date = new Date(new Date() - new Date(scope.customer.joinedTime.toString()));
                    scope.days = date.getUTCDate()-1;
                    scope.hours = date.getUTCHours();
                    scope.minutes = date.getUTCMinutes();
                    scope.seconds = date.getUTCSeconds();
                };

                setIsServed();
                setWaitingQueueTime();
                $interval(setWaitingQueueTime, 1000);

                // calculate how long the customer has queued for
                scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

                scope.remove = function(){
                    $http({
                        method: 'DELETE',
                        url: '/api/customer/remove',
                        params: {id: scope.customer.id}
                    }).then(function(res){
                        scope.onRemoved()();
                    });
                };

                scope.serve = function() {
                    $http({
                        method: 'POST',
                        url: '/api/customer/serve',
                        data: {id: scope.customer.id}
                    }).then(function(res){
                        scope.onServed()();
                    });
                };
            }
        };
    }]);
})();


(function () {
    angular.module('qudini.QueueApp')
        .directive("addCustomer", ["$http", function($http) {

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
    }]);
})();



(function() {
    angular.module('qudini.QueueApp')
        .controller("QueueController", ["$scope", "$http", function($scope, $http) {
            $scope.customers = [];
            $scope.customersServed = [];
            _getCustomers();
            _getServedCustomers();

            $scope.onCustomerAdded = function(){
                _getCustomers();
            };

            $scope.onCustomerRemoved = function(){
                _getCustomers();
            };

            $scope.onCustomerServed = function(){
                _getCustomers();
                _getServedCustomers();
            };

            function _getServedCustomers(){
                return $http.get('/api/customers/served').then(function(res){
                    $scope.customersServed = res.data;
                });
            }

            function _getCustomers(){
                return $http.get('/api/customers').then(function(res){
                    $scope.customers = res.data;
                });
            }
        }]);
})();