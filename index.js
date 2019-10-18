window.addEventListener("load", () => {
   const canvas = document.getElementById("newCanvas");
   const context = canvas.getContext("2d");
   const ballNum = 10;
   context.fillStyle = "black";
   context.fillRect(0, 0, canvas.width, canvas.height);
   const colors = new Array("blue", "red", "yellow", "green", "orange", "purple", "pink");

   let balls = new Array();

   let x = 50;
   let y = 50;
   let xMod = 2.0;
   let yMod = 2.0;

    class Ball {
        constructor(color, size){
        this.x_pos = Math.random() * canvas.width;
        this.y_pos = Math.random() * canvas.height;
        this.color = color;
        this.size = size;
        this.xMod = Math.random();
        this.yMod = Math.random();
        }

        move(){
        // these values are updated every iteration
            // "=>" or arrow functions are a concise way of creating throwaway/mini functions
            // Modify the binding of "this" keyword, also modifies scoping
               if (this.x_pos >= canvas.width || this.x_pos <= 0) {
                  this.xMod *= -1.2;
               }

               if (this.y_pos >= canvas.width || this.y_pos <= 0) {
                   this.yMod *= -0.8;
               }

               this.x_pos += this.xMod;
               this.y_pos += this.yMod;
        }

        draw(){
               // beginPath may not actually be necessary
               context.beginPath();
               // arc is x value, y value, size, starting position, and double the arc provided by PI
               context.arc(this.x_pos, this.y_pos, this.size, 0, 2*Math.PI);
               context.fillStyle = this.color;
               context.fill();
               context.stroke();
            
        }

        clicked(){
            
            console.log("This ball has been clicked!")
            this.x_pos += 2;
            this.y_pos += 2;
        }
    
    }

    function randomChoice(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    for (let i=0; i < ballNum; i++){
        // select a random color by multiplying some random value by the length of the colors array
        // and rounding down
        let randColor = randomChoice(colors)
        balls.push(new Ball(randColor, 25))
    }

    // function to draw ball on canvas
    function canvasDraw(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        // define a function to be carried out on every object in the "balls" array
        // name of element in forEach function doesn't matter
        balls.forEach(function(ball_obj){
        ball_obj.draw();
        ball_obj.move();
        })
    }

    // set interval allows you to specify a function and the length of the interval between runs of the function
    // setInterval makes functions local, don't need to call the function within it
    setInterval(canvasDraw, 10);

    document.addEventListener('click', () => {
        console.log('This window has been clicked!')
    });

});
