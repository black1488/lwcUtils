import { LightningElement, api } from "lwc";

export default class RtSplitView extends LightningElement {
    onMouseClicked;
    md;
    first;
    second;

    renderedCallback() {
        this.first = this.template.querySelector("div[data-my-id=first]");
        this.second = this.template.querySelector("div[data-my-id=second]");
    }

    onMouseDown(evt) {
        this.onMouseClicked = true;
        console.log("mouse down: " + evt.clientX);

        this.md = {
            evt,
            offsetLeft: evt.target.offsetLeft,
            offsetTop: evt.target.offsetTop,
            firstWidth: this.first.offsetWidth,
            secondWidth: this.second.offsetWidth,
        };
        this.template.onmousemove = onMouseMove;
    }
    onMouseUp(evt) {
        console.log("mouse up");
        this.onMouseClicked = false;
        this.template.onmousemove = null;
        this.template.onmouseup = null;
    }
    onMouseLeave(evt) {
        console.log("mouse leave");
        this.onMouseClicked = false;
        this.template.onmousemove = null;
        this.template.onmouseup = null;
    }
    onMouseMove(evt) {
        if (this.onMouseClicked == false) {
            return false;
        } else {
            var delta = {
                x: evt.clientX - this.md.evt.clientX,
                y: evt.clientY - this.md.evt.clientY,
            };

            delta.x = Math.min(
                Math.max(delta.x, -this.md.firstWidth),
                this.md.secondWidth
            );

            evt.target.style.left = this.md.offsetLeft + delta.x + "px";
            this.first.style.width = this.md.firstWidth + delta.x + "px";
            this.second.style.width = this.md.secondWidth - delta.x + "px";
        }
    }
}
