// File: label.js

function Label(x, y, txt, transform) {
    this.x = x; // X position
    this.y = y; // Y position
    this.h = 20;
    this.w = 0;
    this.transform = transform;
    this.txt = txt; // Label text
    this.marked = false;

    this.clickBox = new ClickBox(this.x, this.y, this.w, this.h, this.transform);

    this.getData = function () {
        var data = {};
        data.x = JSON.stringify(this.x);
        data.y = JSON.stringify(this.y);
        data.txt = this.txt;
        return data;
    };

    /*
        Sets the coordinates of the label, rounded to grid size
    */
    this.setCoordinates = function (nx, ny) {
        this.x = Math.round(nx / GRIDSIZE) * GRIDSIZE;
        this.y = Math.round(ny / GRIDSIZE) * GRIDSIZE;
        // Check bounds
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    };

    this.setCoordinates(x, y);

    this.mark = function(marked) {
        this.marked = marked;
    };

    this.updateClickBox = function () {
        this.clickBox.updatePosition(this.x + this.w / 2 - 15, this.y + this.h / 2 - 10);
        this.clickBox.updateSize(this.w, this.h + 10);
        this.clickBox.setTransform(this.transform);
    };

    this.alterText = function(txt) {
        this.txt = txt;
        textSize(20);
        this.w = Math.ceil((textWidth(this.txt) + 10) / 30 + 1) * 30;
        console.log(textWidth(this.txt));
        this.updateClickBox();
    };

    this.alterText(txt);

    /*
        Checks if the mouse is inside the clickBox
    */
    this.mouseOver = function () {
        return this.clickBox.mouseOver();
    };

    this.show = function () {
        noStroke();
        fill(130);
        rect(this.x - 15, this.y - 14, this.w, this.h + 12);
        fill(0);
        rect(this.x - 5, this.y - 5, 10, 10);
        textSize(20);
        textAlign(LEFT, TOP);
        text(this.txt, this.x + 15, this.y - 11, this.w, this.h);
        //this.clickBox.markClickBox();
    };
}