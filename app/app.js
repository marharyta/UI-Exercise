var uiApp = angular.module('uiApp', [
    'ui.router'
  ])
  .config(
    function($stateProvider, 
             $locationProvider, 
             $urlRouterProvider){
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/list');
      $stateProvider
        .state('list',{
          url: '/',
          templateUrl: 'dist/templates/list.ng.html',
          controller: function($scope){

            // Write a function that picks a driver and updates
            // their points every 2 seconds.
            // .... YOUR CODE ...


            $scope.drivers = [
              { "points":0,
                "name": "Kimi Räikkönen",
                "country": "fi",
                "team": 1
              },
              { "points":0,
                "name": "Fernando Alonso",
                "country": "es",
                "team": 1
              },
              { "points":0,
                "name": "Nico Rosberg",
                "country": "de",
                "team": 2
              },
              { "points":0,
                "name": "Lewis Hamilton",
                "country": "uk",
                "team": 2
              },
              { "points":0,
                "name": "Sebastian Vettel",
                "country": "de",
                "team": 3
              },
              { "points":0,
                "name": "Daniel Ricciardo",
                "country": "au",
                "team": 3
              },
              { "points":0,
                "name": "Valtteri Botas",
                "country": "fi",
                "team": 4
              },
              { "points":0,
                "name": "Felipe Massa",
                "country": "br",
                "team": 4
              },
              { "points":0,
                "name": "Kevin Magnussen",
                "country": "dk",
                "team": 5
              },
              { "points":0,
                "name": "Jenson Button",
                "country": "uk",
                "team": 5
              }
            ]
            $scope.teams = [
              { "id": 1,
                "name": "Scuderia Ferrari",
                "car": "Ferrari 059/3"
              },
              { "id": 2,
                "name": "Mercedes AMG Petronas F1 Team",
                "car": "Mercedes PU106A Hybrid"
              },
              { "id": 3,
                "name": "Infiniti Red Bull Racing",
                "car": "Renault Energy F1-2014"
              },
              { "id": 4,
                "name": "Williams Martini Racing",
                "car": "Mercedes PU106A Hybrid"
              },
              { "id": 5,
                "name": "McLaren Mercedes",
                "car": "Mercedes PU106A Hybrid"
              }
            ]
          }
        });
});
