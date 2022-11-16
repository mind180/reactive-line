import { LightningElement, api } from 'lwc';
import { pathForm } from './pathFrom';
import { position } from './position';

const defaultZIndex = '100';

export default class ReactiveLine extends LightningElement {
    @api isShown;
    @api from;
    @api to;
    @api width = 1;
    @api type= 'straight';
    @api orientation = 'horizontal';
    @api isDashed = false;

    get d() {
        if (!this.isShown) return null;

        const from = this.strPointToObject(this.from);
        const to = this.strPointToObject(this.to);
        console.log(from);

        const directionName = this.getDirectionName(from, to);
        console.log(directionName);
        const positionStyle = position[directionName](from, to, this.width);
        console.log(positionStyle);

        this.style = {
            position: 'absolute',
            top: positionStyle.y,
            left: positionStyle.x,
            height: positionStyle.height,
            width: positionStyle.width,
            'stroke-dasharray': this.isDashed ? (this.width * 3 + " " + this.width * 2) : "",
            'z-index': defaultZIndex
        };

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