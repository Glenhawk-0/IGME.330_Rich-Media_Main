        // canvas helpers
        const drawRectangle = (ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black") => {
            ctx.save();
            ctx.fillStyle  = fillStyle;
            ctx.beginPath();
            ctx.rect(x,y,width,height);
            ctx.fill();
            if (lineWidth > 0){
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            ctx.closePath();
            ctx.restore();
        }

        const drawArc = (ctx,x,y,radius,fillStyle="black",lineWidth=0,strokeStyle="black",startAngle = 0,endAngle = (2 * Math.PI) ) => {
            ctx.save();
            ctx.fillStyle  = fillStyle;
            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.fill();
            if (lineWidth > 0){
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            ctx.closePath();
            ctx.restore();
        }

        const drawLine = (ctx,x1,y1,x2,y2,fillStyle="black",lineWidth=0,strokeStyle="black") => {
            ctx.save();
            ctx.fillStyle  = fillStyle;
            ctx.beginPath();
            ctx.moveTo(x1, y1); // Move the pen 
            ctx.lineTo(x2, y2); // Draw a line 
            ctx.fill();
            if (lineWidth > 0){
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            ctx.closePath();
            ctx.restore();
        }

        export { drawLine, drawArc, drawRectangle };