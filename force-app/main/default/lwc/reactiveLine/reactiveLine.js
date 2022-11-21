import { LightningElement, api } from 'lwc';
import { pathForm } from './pathFrom';
import { position } from './position';

export default class ReactiveLine extends LightningElement {
    @api isShown;
    @api from;
    @api to;
    @api width = 1;
    @api type= 'straight';
    @api orientation = 'horizontal';
    @api isDashed = false;
    @api color = 'black';

    connectedCallback() {
        if (!this.isShown) return null;// FIX

        const from = this.strPointToObject(this.from);
        const to = this.strPointToObject(this.to);

        const directionName = this.getDirectionName(from, to);
        const positionStyle = position[directionName](from, to, +this.width);

        this.style = {
            position: 'absolute',
            top: positionStyle.y,
            left: positionStyle.x,
            height: positionStyle.height,
            width: positionStyle.width,
            dasharray: this.isDashed ? (this.width * 3 + " " + this.width * 2) : ""
        };
    }

    get position() {
        return `${'top: ' + this.style.top + 'px; ' +
                  'left: ' + this.style.left + 'px; ' +
                  'height: ' + this.style.height + 'px; ' +
                  'width: ' + this.style.width + 'px' }`;
    }

    get path() {
        const from = this.strPointToObject(this.from);
        const to = this.strPointToObject(this.to);

        const directionName = this.getDirectionName(from, to);
        const positionStyle = position[directionName](from, to, +this.width);
        
        const drawPath = pathForm[this.type][this.orientation][directionName];
        return drawPath(positionStyle.height, positionStyle.width, this.width);
    }

    getDirectionName(from ,to) {
        return this.getVerticalName(from, to) + this.getHorizontalName(from, to);
    }
    
    getVerticalName(from, to) {
        if (this.isTop(from, to)) {
            return 'Top';
        }
        return 'Bottom';
    }
    
    getHorizontalName(from, to) {
        if (this.isRight(from, to)) {
            return 'Right';
        }
        return 'Left';
    }
    
    isRight(from, to) {
        return from.x < to.x;
    }
    
    isTop(from, to) {
        return from.y > to.y;
    }

    strPointToObject(pointAsString) {
        const pointsArr = pointAsString.split(';');
        const x = pointsArr[0];
        const y = pointsArr[1];

        return { x, y };
    }
}