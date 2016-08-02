
          var canvas = this.__canvas = new fabric.Canvas('canvas');
          fabric.Object.prototype.transparentCorners = false;


          //свечи
          var first_candle = new fabric.Rect({
              width: 25, height: 190, left: 175, top: 50, angle: 0,
              stroke: '#eee', strokeWidth: 8,
              fill: 'rgba(0,0,200,0.5)'
            });
          var second_candle = new fabric.Rect({
              width: 25, height: 190, left: 295, top: 50, angle: 0,
              stroke: '#eee', strokeWidth: 8,
              fill: 'rgba(0,0,200,0.5)'
            });
           var third_candle = new fabric.Rect({
              width: 25, height: 190, left: 415, top: 50, angle: 0,
              stroke: '#eee', strokeWidth: 8,
              fill: 'rgba(0,0,200,0.5)'
            });
          var candle = new fabric.Group([ first_candle, second_candle, third_candle ], {    selectable: false
          });

          //индикаторы свечей
          var update_first_candle = new fabric.Rect({
               width: 15, height: 15, left: 185, top: 255, angle: 0,

              fill: 'rgba(192,192,192,0.5)'
             })
          var update_second_candle = new fabric.Rect({
               width: 15, height: 15, left: 305, top: 255, angle: 0,

              fill: 'rgba(192,192,192,0.5)'
             })
          var update_third_candle = new fabric.Rect({
               width: 15, height: 15, left: 425, top: 255, angle: 0,

              fill: 'rgba(192,192,192,0.5)'
             })
           var update_candle = new fabric.Group([ update_first_candle, update_second_candle, update_third_candle ], {
              selectable: false
           });

          //печь
           var furnace = new fabric.Path('M 0 0 L 0 250 Q 170, 390, 340, 250 L 340 0 z', { fill: '', stroke: 'black' });
            furnace.set({ left: 140, top: 150,     selectable: false });
            canvas.add( candle,furnace, update_candle );


function patternRun()
       {
     //Металл на плавку
     var startPoints = [ //координаты каждого объекта 5 объектов, у которых 5 координат прорисовки
      [ //прямоугольник
       {x: 0, y: 60},
       {x: 290, y:60},
       {x: 310, y: 60},
       {x: 310, y: 80},
       {x: 00, y: 80}
       ],
       [ // 1 прямая
       {x: 15, y: 160},
       {x: 20, y: 160},
       {x: 30, y: 160},
       {x: 65, y: 60},
       {x: 50, y: 60}
       ],
       [// 2 прямая
       {x: 10, y: 60},
       {x: 15, y: 60},
       {x: 28, y: 60},
       {x: 118, y: 120},
       {x: 100, y: 120}
       ],
       [// 3 прямая
       {x: 100, y: 60},
       {x: 110,  y: 60},
       {x: 118, y: 60},
       {x: 28,  y: 120},
       {x: 10 , y: 120}
       ],
       [// 4 прямая
       {x: -45,  y: 60},
       {x: -40,   y:60},
       {x: -30 , y: 60},
       {x: 5,   y: 160},
       {x: -10, y: 160}
       ]

      ];
  var clonedStartPoints = [];
  var polygon = []; var j;

    var endPoints = [ //какие координаты должны принять объекты
      [
       {x: -10, y: 65},
       {x: 330, y: 65},
       {x: 330, y: 170},
       {x: 165, y: 245},
       {x: -10, y: 170}
       ],
       [ // 1 прямая
       {x: 15, y: 160},
       {x: 20, y: 160},
       {x: 30, y: 160},
       {x: 65, y: 60},
       {x: 50, y: 60}
       ],
       [// 2 прямая
       {x: 10, y: 60},
       {x: 15, y: 60},
       {x: 28, y: 60},
       {x: 118, y: 120},
       {x: 100, y: 120}
       ],
       [// 3 прямая
       {x: 100, y: 60},
       {x: 110,  y: 60},
       {x: 118, y: 60},
       {x: 28,  y: 120},
       {x: 10 , y: 120}
       ],
       [// 4 прямая
       {x: -45,  y: 60},
       {x: -40,   y:60},
       {x: -30 , y: 60},
       {x: 5,   y: 160},
       {x: -10, y: 160}
       ]
      ];
  for (var i = 0; i < startPoints.length; i++) { //сколько объектов, столько и фигур на холсте
   if (i==0){ //только один сдвиг по топу будет, т.к. больше и не нужно
    j = 0;
   }
   else { j = 1;}
    clonedStartPoints[i] = startPoints[i].map(function(o){ //функция клонирования свойств объекта
      return fabric.util.object.clone(o);
    });
    polygon[i] = new fabric.Polygon(clonedStartPoints[i], { //фигура и её свойства

      left: 150+i*(30+i*i*2) ,
      top: 285+j*35,
      fill: 'rgba(128,0,0,0.5)',
      selectable: false
    });
    canvas.add(polygon[i]); //добавляем фигуру
   }
   //Отсюда начинается вакханалия
    for (var i = 0, len = startPoints.length; i < len; i++) {
     eval('var startPoints_'+(i)+'=startPoints[i]');
     eval('var endPoints_'+(i)+'=endPoints[i]');
    } //это необходимо для endValue

  function animatePoint(s, r, prop, endPoints) { //s - это кол-во объектов, r - их координаты=точки, prop - оси координат, endPoints - конечные точки для объектов
      fabric.util.animate({
        startValue: polygon[s].points[r][prop],
        endValue: eval('endPoints_'+(s)+'[r][prop]'),
        duration: 10000, //Длительность анимации.
        onChange: function(value) {
         polygon[s].set('fill', 'rgba(128,0,0,0.6)'); //изменяет цвет металла
         update_candle.set('fill', '#9966FF'); //изменяет цвет индикаторов свечей
         candle.set('stroke', '#9966FF'); //изменяет цвет вокруг свечей
           polygon[s].points[r][prop] = value;

          // only render once
          if (r === startPoints[0].length - 1 && prop === 'y') {
            canvas.renderAll(); //здесь происходит перерисовка
          }
        },
        onComplete: function() { //Функция для вызова в конце анимации.
         update_candle.set('fill', '#9999FF'); //изменяет цвет индикаторов свечей
         candle.set('stroke', '#9999FF'); //изменяет цвет вокруг свечей
         canvas.remove(polygon[r]); //удаляются все объекты металла
           if (s==4 && r==4 && prop=='y'){ //добавляется "форма" заливки котла
            var filling = new fabric.Path('M 0 140 L 0 250 Q 170, 390, 340, 250 L 340 140 z', { fill: 'rgba(153, 51, 51, 0.8)', stroke: '#993333' });
            filling.set({ left: 140, top: 290,     selectable: false });
             canvas.add( filling );}
             if (canvas.add(filling)) {
               alert('Система завершила работу. \r\n Зарегистрирована максимальная температура: '+temperature+'\r\n Полное время работы системы: '+secs + ' сек.');
               even = !even;
               setTimeout(function(){if (!even) {
                reload= confirm('Перезапустить систему?')
                if (reload) location.reload()
              }}, 3000)
             }
        }
      });
    }

    function animate() {
     alert('Система запущена');
     for (var s=0; s<startPoints.length; s++){
      for (var r = 0, len = startPoints[0].length; r < len; r++) {
        animatePoint(s, r, 'x', even ? endPoints[r] : startPoints[r]);
        animatePoint(s, r, 'y', even ? endPoints[r] : startPoints[r]);
      }}
    }
    var even = true; // если в функции animatePoint even изменять на противоположную, то объекты будут переходить в конечное состояние, а потом обратно в начальное, пока не закрыть браузер
   setTimeout(animate, 1500); //первоначальные запуск анимации


    var timer; var temperature = 0; //здесь запуск таймера и температуры
      (function()
             {
          if (timer) clearInterval(timer);
          secs = 0;
          document.getElementById('timer').innerHTML =  secs + ' сек.';
          timer = setInterval(
             function () {
              secs++;
              if(temperature<1800 && secs%2==0){temperature+=Math.floor(Math.random() * (450 - 250 + 1)) + 250;;}// случайное число в качестве температуры
              document.getElementById('timer').innerHTML = secs + ' сек.';
              document.getElementById('temperature').innerHTML = temperature ;
            },
            1000
            );
              })();
       }
