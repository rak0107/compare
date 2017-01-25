	angular.module("poaEditApp", ["ngRoute"])
	    .config(function ($routeProvider) {
	        $routeProvider
	            .when('/', {
	                controller: 'poaEditController',
	                templateUrl: 'pages/loadElements.html'

	            })
	            .when('/createNew', {
	                controller: 'createNewController',
	                templateUrl: 'pages/createNewElement.html'

	            })
	            .otherwise({
	                redirectTo: '/'
	            });
	    }).factory("ElementTypes", function ($http) {
	        var elementTypes = [];
	        $http.get('JSON/elementTypes.json')
	            .success(function (response) {
	                elementTypes = response;
	            })
	        return elementTypes;

	    })
	    .controller('createNewController', function ($scope, $http, $location) {
	        $scope.createNewForm = function () {
	            $("#mainWindow").width("70%");
	            $(".menuBtn").addClass("btn-success");
	            $location.path('/createNew');
	            var div = $("<div>").attr("ng-include", "'loadElements.html'");
	            $(div).css(['width', '30%', 'float', 'right']);
	            $('body').append(div);
	        }
	    })
	    .controller('poaEditController', function ($scope, $http, $location) {
	        $scope.queryBy = '$'
	        $scope.query = {};
	        $scope.orderProp = "type";
	        	       
	        $http.get('JSON/elementsJSON.json')
	            .success(function (response) {
	                $scope.artworkElements = response;
	            })
	        $scope.handleRowSelection = function (Event) {

	            if ($($(event.currentTarget)[0]).prop('checked')) {
	                $(".remove-btn-menu").removeClass("disabled");                    
	                $(event.currentTarget).closest("tr").addClass("success");                    
	            } else {
	                $("tr").removeClass("success");
	                $(".remove-btn-menu").addClass("disabled");
	            }
	        }

	        $scope.selectOrDeselectAll = function () {
	            if ($($(event.currentTarget)[0]).prop('checked')) {
	                $(".btn-menu").removeClass("disabled");
	                $("tr").addClass("success");	                
	                $("input").prop('checked', true);
                    /*var elements = $(".btn-menu"); //.css("background-color:'white'");                    
                    $(elements).each(function( index ) {
                        $(this).css("background-color", "white");                        
                    }); */
                    $(".remove-btn-menu").css('background-color', 'white');                    
	            } else {
	                $("input").prop('checked', false);
	                $("tr").removeClass("success");
	                $(".btn-menu").addClass("disabled");
                    
                    /*var elements = $(".btn-menu"); //.css("background-color:'white'");                    
                    $(elements).each(function( index ) {
                        $(this).css("background-color", "lightgray");                        
                    });*/
                    
	            }
	        }

	        $scope.createNewElement = function () {
	            $location.path('/createNew');
	            $(".menuBtn").addClass("btn-success");
	            $("#mainWindow").width("70%");
	            var div = $("<div>").attr("ng-include", "'slideIn.html'");
	            $('body').append(div);
	        }


	        // define list of items
	        $scope.filterElements = ["All", "Missing", "Modified", "New"];

	        $scope.sortColumns = function (sortByRow) {
	            $scope.orderElements = sortByRow;
	        }

	        /*$scope.createNewForm = function(){
	            $("#mainWindow").width("70%");
	            //$location.path('/createNew');                
	        } */

	        $scope.removeElement = function () {
	            //$($(jQuery("input:checked")[0]).closest('tr')[0]).remove();
	            $($(jQuery("input:checked")).closest('tr')).remove();
	            $scope.selectOrDeselectAll();
	        }

	        $scope.addElementToAssembly = function () {
	            var elementInfo = {
	                "type": $scope.elementType,
	                "elementName": $scope.elementName,
	                "languagename": "English",
	                "copyText": $scope.copyText,
	                "lc_currentstate": "Preliminary",
	                "elementFilter": "All",
	                "InstSeq": $scope.instanceSequence
	            };

	            $scope.artworkElements.push(elementInfo);
	            $location.path('/');
	        }

	    })	    
	    .controller("TypeaheadCtrl", function ($scope, ElementTypes) {
            $scope.elementType = undefined;
	        $scope.selected = undefined;
	        $scope.elementTypes = ElementTypes;

	    });