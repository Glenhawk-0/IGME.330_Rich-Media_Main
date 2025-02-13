 // 

        import {  getRandomColor, getRandomInt } from "./utils.js";
        import {  drawRectangle, drawArc, drawLine } from "./canvas-utils.js";


        let ctx;
        let paused = false;
        let canvas;
        let createRectangles = true;
        let createArcs = true;
        let createLines = true;


        
        const init = () => {
            console.log("page loaded!");

            canvas = document.querySelector("canvas");

            ctx = canvas.getContext("2d");

            const borderWidth = 10;
            //
            drawRectangle(ctx,20,20,600,440,"maroon",borderWidth,"purple")

            drawRectangle(ctx,50,50,45,70,"red",0,"blue");

            drawRectangle(ctx,150,50,17,90,"yellow",0,"blue");

            drawRectangle(ctx,70,140,60,45,"orange",0,"blue");

            drawRectangle(ctx,180,130,100,100,"darkblue",2,"blue")
            //
            drawArc(ctx,100,350,50,"yellow",0,"blue",0,(2 * Math.PI));
            
            drawArc(ctx,70,300,10,"black",borderWidth,"blue",0,(2 * Math.PI));

            drawArc(ctx,130,298,15,"maroon",borderWidth,"blue",0,(2 * Math.PI));
            //
            drawLine(ctx,40,420,600,420,"black",20,"green")
            
            setupUI();
            update();

        }//end of Init

        //window.onload = init;// it has to here now because of the arrow function
        
        
        const update = () =>  {
            if (paused == true) { return;}
            requestAnimationFrame(update);
            if (createRectangles == true) {drawRandomRect();}
            if (createArcs == true)       {drawRandomArc();}
            if (createLines == true)      {drawRandomLine();}
            
        }

        const drawRandomRect = () => {
            drawRectangle(ctx,getRandomInt(0, 640),getRandomInt(0, 480),getRandomInt(10, 90),getRandomInt(10, 90),getRandomColor(),getRandomInt(2, 12),getRandomColor());
        }


        const drawRandomArc = () => {
            drawArc(ctx,getRandomInt(0, 640),getRandomInt(0, 480),getRandomInt(5, 45),getRandomColor(),getRandomInt(2, 12),getRandomColor(),0,2 * Math.PI);
        }


        const drawRandomLine = () => {
            drawLine(ctx,getRandomInt(0, 640),getRandomInt(0, 480),getRandomInt(0, 640),getRandomInt(0, 480),getRandomColor(),getRandomInt(2, 10),getRandomColor());
        }

        //event handlers
        const canvasClicked = (e) => {
            let rect = e.target.getBoundingClientRect();
            let mouseX = e.clientX - rect.x;
            let mouseY = e.clientY - rect.y;
            console.log(mouseX, mouseY);

            for(let i = 0; i < 10; i++){
                let x = getRandomInt(-100, 100 ) + mouseX;
                let y = getRandomInt(-100, 100 ) + mouseY;
                let width = getRandomInt(20,50);
                let height = getRandomInt(20,50);
                let radius = getRandomInt(5,25);
                let color = getRandomColor();
                //drawRectangle(ctx,x,y,width,height,color);
                drawArc(ctx,x,y,radius,color,0,"black",0,(2 * Math.PI));
                
                
            }

        }



        //helpers
        const setupUI = () => {
            document.querySelector("#btn-pause").onclick = () => {
                paused = true;
            };

            document.querySelector("#btn-play").onclick = () => {
                if(paused == true){
                paused = false;
                update();
                }
            };

            document.querySelector("#btn-clear").onclick = () => {
                ctx.clearRect(0,0,640,480);
            };

            canvas.onclick = canvasClicked;

            document.querySelector("#cb-rectangles").onclick = (e) => {
                createRectangles = e.target.checked;
            }

            document.querySelector("#cb-arcs").onclick = (e) => {
                createArcs = e.target.checked;
            }

            document.querySelector("#cb-lines").onclick = (e) => {
                createLines = e.target.checked;
            }

        }// end setupUI




        init();
        //END OF SCRIPT