(function () {
    angular
        .module('directives')
        .directive('customer', Customer);

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customer($http, $interval){

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
                    })
                };

                scope.serve = function() {
                    $http({
                        method: 'POST',
                        url: '/api/customer/serve',
                        data: {id: scope.customer.id}
                    }).then(function(res){
                        scope.onServed()();
                    })
                };
            }
        }
    }

})()

