import { HorizontalCurve, VerticalCurve } from './curve';
import { HorizontalRectangular, VerticalRectangular } from './rectangular';
import { Straight } from './straight';

export const pathForm = {
  curve: {
    horizontal: HorizontalCurve,
    vertical: VerticalCurve
  },
  rectangular: {
    horizontal: HorizontalRectangular,
    vertical: VerticalRectangular
  },
  straight: {
    horizontal: Straight,
    vertical: Straight
  }
};