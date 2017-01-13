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

            $scope.drivers = [
              { "points":0,
                "name": "Kimi Räikkönen",
                "country": "fi",
                "car": "assets/images/homer-simpson.svg",
                "team": 1
              },
              { "points":0,
                "name": "Fernando Alonso",
                "car": "assets/images/monarchbutterfly.svg",
                "country": "es",
                "team": 1
              },
              { "points":0,
                "name": "Nico Rosberg",
                "car": "assets/images/owl.svg",
                "country": "de",
                "team": 2
              },
              { "points":0,
                "name": "Lewis Hamilton",
                "car": "assets/images/lion.svg",
                "country": "uk",
                "team": 2
              },
              { "points":0,
                "name": "Sebastian Vettel",
                "car": "assets/images/lion2.jpg",
                "country": "de",
                "team": 3
              },
              { "points":0,
                "name": "Daniel Ricciardo",
                "car": "assets/images/penguin.svg",
                "country": "au",
                "team": 3
              },
              { "points":0,
                "name": "Valtteri Botas",
                "car": "assets/images/panter.jpg",
                "country": "fi",
                "team": 4
              },
              { "points":0,
                "name": "Felipe Massa",
                "car": "assets/images/eagle.png",
                "country": "br",
                "team": 4
              },
              { "points":0,
                "name": "Kevin Magnussen",
                "car": "assets/images/hedgehog.svg",
                "country": "dk",
                "team": 5
              },
              { "points":0,
                "name": "Jenson Button",
                "car": "assets/images/squirrel.png",
                "country": "uk",
                "team": 5
              }
            ];
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
            ];


            /***
        
              This is a demo of space formula 1
              You have to bet on one of five rockets that will eventually make it to the orbit.
              rate 1:10m skaling
              atmosphere is 500km => 500km = 500 *1000m  => 500 000px

            ***/

            //universe model variables
            //distance of universe
            const h = 30000;
            //width of universe
            const w = 1200;
            //rocker size (or car-rocket)
            const rocketHeight = 50;
            //distance they have to fly to reach the orbit
            const distanceToFly = 2000; //km to fly for the rocker
            const universeWidth = 1200;

            //atmosphere heights
            const tropopauzeHeight = 1200;
            const stratopauzeHeight = 4500;
            const mesopauzeHeight = 8500;
            const thermopauzeHeight = 20000;
            const ionosfeerHeight = 30000;

            const drivers = $scope.drivers;
            const teams = $scope.teams;
            //create svg element
            const svg = d3.select("body").append("svg");

            let windowSize = 900;

            svg 
              .attr("width", 900)
              .attr("height", 600)
              .attr("id", "rocketEngine")
              .attr("preserveAspectRatio", "xMidYMin "+ "slice")
              .attr("viewBox", " " + 0 + " "+ ((h-rocketHeight)- 40-600) + " " + w + " " + h+ " ");

            //change svg on resize
            function changeOnResize(){
                var wind = window,
                    d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0],
                    x = wind.innerWidth || e.clientWidth || g.clientWidth,
                    y = wind.innerHeight|| e.clientHeight|| g.clientHeight;

                    windowSize = x;
                    svg
                    .attr("width", windowSize)
                    .attr("viewBox", " " + 0 + " "+ ((h-rocketHeight)- 40-600) + " " + w + " " + h+ " ");

            }

            changeOnResize();

            window.addEventListener('resize', function(event){
              changeOnResize();
            });
           

              //create defs for extra elements

            var defs = svg.append("defs");

            var skyGradient = defs
              .append("linearGradient")
              .attr("id", "skyGradient")
              .attr("x1", "0.5")
              .attr("x2", "0.5")
              .attr("y1", "1")
              .attr("y2", "0.5");

            skyGradient
              .append("stop") 
              .attr("offset", "0%")
              .attr("stop-color", "lightblue");
              
            skyGradient
              .append("stop")
              .attr("offset", "75%")
              .attr("stop-color", "#213B63");

            skyGradient
              .append("stop")
              .attr("offset", "100%")
              .attr("stop-color", "#122036");

            var ozoneLayerGradient = defs
              .append("linearGradient")
              .attr("id", "ozoneLayerGradient")
              .attr("x1", "0.5")
              .attr("x2", "0.5")
              .attr("y1", "1")
              .attr("y2", "0");

            ozoneLayerGradient
              .append("stop") 
              .attr("offset", "0%")
              .attr("stop-color", "rgba(87,199,167, 0.01)"); //rgb(87,199,167) rgb(121,210167)

            ozoneLayerGradient
              .append("stop") 
              .attr("offset", "50%")
              .attr("stop-color", "rgba(87,199,167, 0.9)");
              
            ozoneLayerGradient
              .append("stop")
              .attr("offset", "100%")
              .attr("stop-color", "rgba(87,199,167, 0.01)");

            //end of defs

            const mainGroup = svg.append("g");

            //background sky 
            const backgroundSky = mainGroup
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", h)
              .attr("width", w )
              .attr("fill", "url(#skyGradient)");

    
            //atmosphere layers

            const tropopauze = mainGroup.append("g"); //12 km => 12 * 1000m => 120 00m/100 => 1200px
            const stratopauze = mainGroup.append("g"); //45 km => 45 000m => 4500px
            const mesopauze = mainGroup.append("g"); //85 km => 85 000m => 8500px
            const thermopauze = mainGroup.append("g"); //20 0km > 200 0 00 = 20000px
            const ionosfeer = mainGroup.append("g"); //500km

            tropopauze
              .attr("id", "tropopauze")
              .attr("transform", "translate(0," + (h-tropopauzeHeight) +")")
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", tropopauzeHeight)
              .attr("width", w)
              .attr("fill", "transparent");

            //add clouds
            tropopauze
              .append("svg:image")
              .attr('x', 0)
              .attr('y', tropopauzeHeight-300)
              .attr("id", "cloud1")
              .attr('width', 300)
              .attr('height', 100)
              .attr("xlink:href", "assets/images/cloud.svg");

            tropopauze
              .append("svg:image")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', 2000)
              .attr('height', 100)
              .attr("xlink:href", "assets/images/cloud.svg");

            stratopauze
              .attr("id", "stratopauze")
              .attr("transform", "translate(0," + (h-stratopauzeHeight) +")")
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", stratopauzeHeight-tropopauzeHeight)
              .attr("width", w)
              .attr("fill", "transparent");

            stratopauze
              .append("svg:image")
              .attr('x', 500)
              .attr('y', 0)
              .attr('width', 200)
              .attr('height', 500)
              .attr("xlink:href", "assets/images/baloon.png");

            mesopauze
              .attr("id", "mesopauze")
              .attr("transform", "translate(0," + (h-mesopauzeHeight) +")")
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", mesopauzeHeight - stratopauzeHeight)
              .attr("width", w)
              .attr("fill", "transparent");

            thermopauze
              .attr("id", "thermopauze")
              .attr("transform", "translate(0," + (h-thermopauzeHeight) +")")
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", thermopauzeHeight - mesopauzeHeight)
              .attr("width", w )
              .attr("fill", "transparent");

            ionosfeer
              .attr("id", "ionosfeer")
              .attr("transform", "translate(0," + (h-ionosfeerHeight) +")")
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", ionosfeerHeight - thermopauzeHeight)
              .attr("width", w)
              .attr("fill", "transparent");

            //checkpoints

            tropopauze
              .append("text")
              .attr("x",20)
              .attr("y",0)
              .text("Troposphere");

            stratopauze
              .append("text")
              .attr("x",20)
              .attr("y",0)
              .text("Stratosphere");

            mesopauze
              .append("text")
              .attr("x",20)
              .attr("y",0)
              .text("Mesosphere");

            thermopauze
              .append("text")
              .attr("x",20)
              .attr("y",0)
              .text("Thermosphere");

            ionosfeer
              .append("text")
              .attr("x",20)
              .attr("y",0)
              .text("Ionosphere");

            mainGroup
              .append("text")
              .attr("x",20)
              .attr("y", h-1200)
              .text("1200");

            mainGroup
              .append("text")
              .attr("x",20)
              .attr("y", h-4500)
              .text("4500");

            mainGroup
              .append("text")
              .attr("x",20)
              .attr("y", h-3000)
              .text("3000");

            mainGroup
              .append("text")
              .attr("x",20)
              .attr("y", h-2000)
              .text("2000");

    
            //ozone layer
            const ozoneLayer = stratopauze.append("g"); // 20-30km from earth => 20 000m => 2000
              
            ozoneLayer
              .attr("id", "ozoneLayer")
              .attr("transform", "translate(0," + 1500 +")")
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", 1000)
              .attr("width", w)
              .attr("fill", "url(#ozoneLayerGradient)");

            //stars
            const starsGroup = mainGroup.append("g");

            function generateStarsIonosphere(num){
              let arr = [];
              for(var i = 0; i <= num; i++){
                arr.push(3);
              }
              return arr;
            }

            function randmizeStarPosition(){
              let width = 1200;
              let w = Math.floor(Math.random() * width ) + 1;
              let h = Math.floor(Math.random() * (ionosfeerHeight - thermopauzeHeight)) + 1;
              return [w, h];
            }

            let dataset = generateStarsIonosphere(500);
            let stars = starsGroup.selectAll("circle")
              .data(dataset)
              .enter()
              .append("circle")
              .attr("cx", function(d, i) {
                return randmizeStarPosition()[0];
              })
              .attr("cy", function(){
                return randmizeStarPosition()[1];
              })
              .attr("r", function(d) {
                return d;
              })
              .attr("fill", "white");

            function drawRocket(gap,number, name, car, points){

              var rocketGroup = mainGroup
                .append("g")
                .attr("class", "rocketG rocketG" + number)
                .attr("transform", "translate(0, 0)");

              var rocketPic = rocketGroup
                .append("rect")
                .attr("class", "rocket rocket" + number)
                .attr("x", function(){
                  return number*105 + 50;
                })
                .attr("y", h-rocketHeight*2)
                .attr("width", 20)
                .attr("height", rocketHeight)
                .attr("fill", "transparent");


              rocketGroup
                .append("svg:image")
                .attr('x', function(){
                  return number*105+25;
                })
                .attr('y', h-rocketHeight*2)
                .attr('width', rocketHeight)
                .attr('height', rocketHeight)
                .attr("xlink:href", "assets/images/rocket.svg");

              rocketGroup
                .append("svg:image")
                .attr('x', function(){
                  return number*105 + 40;
                })
                .attr('y', h-rocketHeight*2)
                .attr('width', 20)
                .attr('height', 20)
                .attr("xlink:href", car);
              
              rocketGroup
                .append("text")
                .attr("x",function(){
                  return number*105 +25;
                })
                .attr("y",h-rocketHeight/2)
                .text(name.split(' ')[0]);

              rocketGroup
                .append("text")
                .attr("class", "rocketT rocketT" + number)
                .attr("x",function(){
                  return number*105 +25;
                })
                .attr("y",h-rocketHeight/4)
                .text(points);
             
            }
    
            function randomlyGenerateDistance(){
              return Math.floor((Math.random() * 20000) + 9000);
            }

            function drawAllRockets(){
              for (var i = 0; i < drivers.length; i++) {
                drawRocket(30+i*80, i, drivers[i].name, drivers[i].car, drivers[i].points);
              };
            }

            function showWinner(winner){
              let winnerSign =  ionosfeer
                .append("text")
                .attr("x",function(){
                  return 200;
                })
                .attr("y", 200)
                .text("Winner!");
            }
         
            function moveit(timestamp, el, dist, duration, num){
              var elm = el;
              var timestamp = timestamp || new Date().getTime();
              var runtime = timestamp - starttime;
              var progress = runtime / duration;
              progress = Math.min(progress, 1);
              var calculatedRocketPosition = h-(dist*progress)-rocketHeight;
              elm.attr("transform", "translate(0, -" + (h-calculatedRocketPosition-rocketHeight*2) + ")");
              $scope.$apply(function(scope) {
                // Execute this function with the scope
                scope.drivers[num].points = h-calculatedRocketPosition-rocketHeight;
              });
              
              d3.select(".rocketT"+ num + " ").text($scope.drivers[num].points + "");
                  
              if (runtime < duration){ // if duration not met yet
                  requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                      moveit(timestamp, el, dist, duration, num);
                  });
              }
              else{
               
              }
            }
       
            function moveSky(timestamp, el, dist, duration){
              var timestamp = timestamp || new Date().getTime();
              var runtime = timestamp - starttime;
              var progress = runtime / duration;
              progress = Math.min(progress, 1);
              var calculatedRocketPosition = h-(dist*progress)-rocketHeight;
              if(calculatedRocketPosition >= 2000){
                //moveSmth
              }
              svg.attr("viewBox", " " + 0 + " "+ calculatedRocketPosition + " " + w + " " +  h+ " ");
              if (runtime < duration){ // if duration not met yet
                  requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                      moveSky(timestamp, el, dist, duration);
                  });
              } else{
                 showWinner();
              }
            }
     
            
            function launchRockets(){
              var rockets = [];
              var allRockets = d3.selectAll(".rocketG")._groups[0].length;
              for (var i = 0; i < allRockets; i++) {
                var item = d3.select(".rocketG" + i);
                rockets.push(item);
              };

              rocketFly  = window.requestAnimationFrame(function(timestamp){
                starttime = timestamp;
                requestAnimationFrame(function(timestamp){
                    starttime = timestamp || new Date().getTime();
                    let distance = 0;
                    for (var i = 0; i < rockets.length; i++) {
                      let random = randomlyGenerateDistance();
                      if(random >= distance){
                        distance = random;
                      }
                      moveit(timestamp, rockets[i], random, 12000, i);
                    };
                    moveSky(timestamp, rockets[1], distance, 12000);
                });
              });
              
            }

            drawAllRockets();

            document.getElementById("start").addEventListener("click", function() {
                launchRockets();
            });

          }
        });
});


