import '@rnmapbox/maps';

declare module '@rnmapbox/maps' {
  interface ShapeSourceProps {
    cluster?: boolean;
    clusterRadius?: number;
    clusterMaxZoom?: number;
  }

  interface SymbolLayerStyle {
    iconAllowOverlap?: boolean;
    iconImage?: string | string[];
    iconSize?: number | any[];
    textField?: string | any[];
    textSize?: number;
    textColor?: string;
    textIgnorePlacement?: boolean;
    textAllowOverlap?: boolean;
  }

  interface CircleLayerStyle {
    circleColor?: string;
    circleRadius?: number;
    circleOpacity?: number;
    circleStrokeWidth?: number;
    circleStrokeColor?: string;
  }
}
