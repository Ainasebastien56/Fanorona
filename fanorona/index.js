//START....................................................................................................................

//********************************************Canvas definition**************************************************************
let   canvasDefinition  =  function () {
   canvas   =  document.querySelector('canvas')
   canvas_width   =  380
   canvas_height  =  canvas_width
   ctx   =  canvas.getContext('2d')

   canvas.style.background =  "white"
   canvas.width   =  canvas_width
   canvas.height  =  canvas_height
}
canvasDefinition()

//********************************************Objects representations and definitions***************************************************************

//LINE
let   lineDefinition  =  function (x1Line1, y1Line1, x2Line1, y2Line1, x2Line2, y2line2, LineSpeed) {
//DEFINITION
   class Line  {
      constructor  (x1, y1,   x2,   y2, speeds) {
         this.x1  =  x1
         this.y1  =  y1
         this.x2  =  x2
         this.y2  =  y2
         this.speeds  =  speeds
    
         this.movX   =  1*this.speeds
         this.movY   =  1*this.speeds
      }
    
      drawLine (ctx) {
         ctx.beginPath()
         ctx.strokeStyle   =  "rgba(0,0,0,1)"   //strokeStyle: propriété qui ajoute de la couleur ou dégradé au dessin
         ctx.lineWidth  =  3
         ctx.moveTo(this.x1,  this.y1)  //moveTo(x-coordinatde, y-coordinate): déplace le chemin vers le point spécifié dans le canevas sans créer de line
         ctx.lineTo(this.x2,  this.y2)  //lineTO(x-coordinate, y-coordinate): ajoute un nouveau point et créé une ligne vers ce point à partir du dernier point dans le canevas sans créer de ligne 
         ctx.stroke() 
         ctx.closePath()
      }
    
      moveLine () {
         this.x1  += this.movX
         this.drawLine(ctx)
      }
   }

//INSTANTIATION
   line1 =  new   Line(x1Line1, y1Line1, x2Line1, y2Line1, LineSpeed)  //vertical left
   line1.drawLine(ctx)

   line2 =  new   Line(line1.x1 ,line1.y1, x2Line2, y2line2,  LineSpeed)   //horizental top
   line2.drawLine(ctx)

   line3 =  new   Line(line2.x2, line2.y2, line2.x2, line1.y2, LineSpeed) //vertical right
   line3.drawLine(ctx)

   line4 =  new   Line(line1.x2, line1.y2, line3.x2, line3.y2, LineSpeed)   //horizental bottom
   line4.drawLine(ctx)

   line5 =  new   Line(line2.x1, line2.y2, line3.x2, line3.y2, LineSpeed) //diagonal top-left to bottom-right
   line5.drawLine(ctx)

   line7 =  new   Line(line2.x2, line2.y2, line1.x2, line1.y2, LineSpeed) //diagonal top-right to bottom-left
   line7.drawLine(ctx)

   line8 =  new   Line((line2.x1+line2.x2)/2, line2.y1, (line4.x1+line4.x2)/2, line4.y1, LineSpeed)  //vertical middle
   line8.drawLine(ctx)

   line9 = new Line(line2.x1, (line2.y1+line4.y1)/2, line2.x2, (line2.y1+line4.y1)/2, LineSpeed)  //horizental middle
   line9.drawLine(ctx)
}
lineDefinition(30, 30, 30, 350, 350, 30, 0)

//POSITION
let   positionDefinition   =  function (xPosition1, yPosition1, posR)  {
//DEFINITION
   class Position {
      constructor (x,   y, posRadius) {
         this.xPosition =  x
         this.yPosition =  y
         this.posRadius =  posRadius
      }
   
      letPosition (ctx) {
         ctx.fillStyle= 'yellow'
         ctx.beginPath()
         ctx.arc(this.xPosition, this.yPosition, this.posRadius, 0, Math.PI*2, false)
         ctx.stroke()
         ctx.closePath()
      }
   
      binary   (test =  Boolean) {
         return   test
      }
      clickedPosition   (xmouse, ymouse) {
         let   center_pointer =  Math.sqrt(Math.pow(xmouse-this.xPosition, 2)   +  Math.pow(ymouse-this.yPosition, 2))
         if(center_pointer <  this.posRadius)   {
            this.designe   =  0
            return   this.designe
         }  else  {
               this.designe   =  1
            return   this.designe
         }
      }
 
   }


//INSTANTITION
   allPosition =  []

   position1   =  new   Position(xPosition1, yPosition1, posR)
   position1.letPosition(ctx);   allPosition.push(position1);  

   position2   =  new   Position(position1.xPosition+160, position1.yPosition, posR)
   position2.letPosition(ctx);   allPosition.push(position2)

   position3   =  new   Position(position1.xPosition+320, position1.yPosition, posR)
   position3.letPosition(ctx);   allPosition.push(position3)

   position4   =  new   Position(position1.xPosition, position1.yPosition+160, posR)
   position4.letPosition(ctx);   allPosition.push(position4)

   position5   =  new   Position(position4.xPosition+160, position4.yPosition, posR)
   position5.letPosition(ctx);   allPosition.push(position5)

   position6   =  new   Position(position4.xPosition+320, position4.yPosition, posR)
   position6.letPosition(ctx);   allPosition.push(position6)

   position7   =  new   Position(position1.xPosition, position1.yPosition+320, posR)
   position7.letPosition(ctx);   allPosition.push(position7)

   position8   =  new   Position(position7.xPosition+160, position7.yPosition, posR)
   position8.letPosition(ctx);   allPosition.push(position8)

   position9   =  new   Position(position7.xPosition+320, position7.yPosition, posR)
   position9.letPosition(ctx);   allPosition.push(position9)
}
positionDefinition(30, 30, 18)

//CIRCLE
let   circleDefinition  =  function (radius) {
//DEFINITION
   class Circle   {
      constructor (x, y, r, color, speed)  {
      this.xPos   =  x
      this.yPos   =  y 
      this.radius   =  r
      this.firstColor   =  color
      this.color  =  color
      this.speed  =  speed
   
      this.mx  =  0*this.speed
      this.my  =  1*this.speed
   
      this.designe   =  false
      }
       
    
      drawCircle   (ctx) {
        ctx.fillStyle   =  this.color
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.radius , 0, Math.PI*2, false)
        ctx.fill()   //fill(): méthode qui remplit le dessin courant 
      }
   
      moveCircleTop  () {
         if(   (this.yPos>190)   |  (this.yPos<30) )  this.my  =  -this.my
   
         //this.xPos   += this.mx
         this.yPos   += this.my
         this.drawCircle(ctx)
      }
   
      moveCircleBottom  () {
         if(   (this.yPos<190)   |  (this.yPos>350) )  this.my  =  -this.my
   
         //this.xPos   += this.mx
         this.yPos   += this.my
         this.drawCircle(ctx)
      }
   
      changeColor(newColor)   {
         this.color  =  newColor
         this.drawCircle(ctx)
      }
   
      clickedCircle  (xmouse, ymouse) {
         let   center_pointer =  Math.sqrt(Math.pow(xmouse-this.xPos, 2)   +  Math.pow(ymouse-this.yPos, 2))
         if(center_pointer <  this.radius)   {
            this.changeColor("black")
            this.designe   =  false
            return   this.designe
         }  else  {
            this.changeColor(this.firstColor)
            this.designe   =  true
            return   this.designe
         }
      }
   }

//INSTANTIATION
   allCircle   =  []

   circle1  =  new   Circle   (30, 30, radius, "red", 0)
   circle1.drawCircle(ctx);   allCircle.push(circle1)

   circle2  =  new   Circle   (190 , 30, radius, "red", 0)
   circle2.drawCircle(ctx);   allCircle.push(circle2)

   circle3  =  new   Circle   (350, 30, radius, "red", 0)
   circle3.drawCircle(ctx);   allCircle.push(circle3)

   circle4  =  new   Circle( 30, 350, radius, "blueviolet", 0)
   circle4.drawCircle(ctx);   allCircle.push(circle4)

   circle5  =  new   Circle(190, 350, radius, "blueviolet", 0)
   circle5.drawCircle(ctx);   allCircle.push(circle5)

   circle6  =  new   Circle(350, 350, radius, "blueviolet", 0)
   circle6.drawCircle(ctx);   allCircle.push(circle6)
}
circleDefinition(15)

//********************************************Game Rules**************************************************************

//Turn true all position which contains circle
let   boolPositionCircle   =  function()  {
   bool  =  []

   for(var  i=0;  i<allPosition.length;   i++) {
      bool.push(allPosition[i].binary(false));
   }

   for(var  i=0;  i<allPosition.length;   i++) {
      var   j=0
      do  {
            if (allPosition[i].xPosition==allCircle[j].xPos  && allPosition[i].yPosition==allCircle[j].yPos)   {
               bool[i]  =  true
            }
            j+=1
      }  while(bool[i]!=true  && j<allCircle.length)
   //console.log(bool[i])
   }
}
boolPositionCircle()
//********************************************Dislpays and Animations**************************************************************

let   moveObjet   =  function() {
   ctx.clearRect(0, 0, canvas_width, canvas_height)
   requestAnimationFrame(moveObjet)

   line1.moveLine()
   line2.moveLine()
   line3.moveLine()
   line4.moveLine()
   line5.moveLine()
   line7.moveLine()
   line8.moveLine()
   line9.moveLine()
   circle1.moveCircleTop()
   circle2.moveCircleTop()
   circle3.moveCircleTop()
   circle4.moveCircleBottom()
   circle5.moveCircleBottom()
   circle6.moveCircleBottom()
}

const d =230;



let   deplaceCirlce  =  function () {
   boolCircle  =  []
   for(var  i=0; i<allCircle.length; i++) {
      boolCircle.push(true)
 }
/*   tabPos = []
   for(i=O; i<allPosition.length; i++) {
      tabPos.push(1)
   }*/

   canvas.addEventListener('click', (event)  => {
      rect  =  canvas.getBoundingClientRect()   //getBoundingClientRect(): méthode qui renvoit la taille d'un élément et sa position par rapprot à la fenêtre
      xPosition  =  event.clientX  -  rect.x   //clientX: renvoie les coordonnée horizentale du pointeur de la souris lorsqu'un évènement souris a été déclenché
      yPosition  =  event.clientY  -  rect.y   //clientY: renvoie les coordonnée verticale du pointeur de la souris lorsqu'un évènement souris a été déclenché
      
      for(j=0; j<allCircle.length; j++)   {
         bool_ =  allCircle[j].clickedCircle(xPosition, yPosition)
            
         if(bool_ == false) {
            for(k=0;k<allPosition.length;k++){
               if(allPosition[k].xPosition ==allCircle[j].xPos && allPosition[k].yPosition ==allCircle[j].yPos ){
                  v=k;
               }
            }
            boolCircle[j]  =  false

            //console.log('circle'+j+'='+boolCircle[j]+'  ')
         }
         for(var  i=0; i<allCircle.length && i!=j; i++) {
            if(bool_ == false) {
               boolCircle[i]  =  true;
            Cclick = allCircle[j]
               //console.log('circle'+j+'='+boolCircle[j]+'  ')
            }
           
         }
      }
      
      for(j=0; j<allPosition.length; j++)   {
         
      bool_p = allPosition[j].clickedPosition(xPosition, yPosition)
         for(i=0; i<allCircle.length; i++)   {
            
            if(bool_p == 0)   {
               if(i== 1 || i==3 || i==5 || i==7){
              
            
               if(j== 1 || j==3 || j==5 || j==7){
                  bool[j] =true;
               }  else  boolPositionCircle()

               
               console.log(' j='+j+' i= '+i)
               
                     
               }
               if(bool[j]  == false && boolCircle[i] == false )   {
                  distance = Math.sqrt(Math.pow((allPosition[j].xPosition-allCircle[i].xPos), 2)+Math.pow((allPosition[j].yPosition-allCircle[i].yPos), 2))
                     if(distance<d) {
              
                        
                        
                        allCircle[i].xPos   =  allPosition[j].xPosition
                        allCircle[i].yPos =  allPosition[j].yPosition
                        boolCircle[i]  = true
                        cmp = 1
                        boolPositionCircle()
                     }
            }
              // console.log('boolCircle'+i+'='+boolCircle[i])
            }
            boolPositionCircle()}
      //boolPositionCircle()
      }
   })
}
deplaceCirlce()
moveObjet()



//STOP....................................................................................................................