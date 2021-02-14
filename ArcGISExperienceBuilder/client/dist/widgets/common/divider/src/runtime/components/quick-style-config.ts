import { LineStyle, PointStyle, Direction, QuickStyleType } from '../../config';
import { IMThemeVariables } from 'jimu-core';
export function getQuickStyleConfig (theme: IMThemeVariables) {
  const colors      = theme?.colors?.palette;
  const POINTSIZE   = 4;
  const POINTSIZE1   = 2;
  const STROKESIZE  = '3px';
  // const STROKESIZE1 = '4px';
  const STROKESIZE2 = '6px';
  const STROKESIZE3 = '8px';
  const DIRECTION   = Direction.Horizontal;
  return  {
    Default: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Default
      }
    },
    Style1: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style2,
        color: `${colors?.danger[700]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style1
      }
    },
    Style2: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style3,
        color: `${colors?.warning[700]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style2
      }
    },
    Style3: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style6,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style3
      }
    },
    Style4: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style1,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style4
      }
    },
    Style5: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style7,
        color: `${colors?.info[600]}`,
        size: STROKESIZE2
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style5
      }
    },
    Style6: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style8,
        color: `${colors?.success[700]}`,
        size: STROKESIZE2
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style6
      }
    },
    Style7: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style9,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE2
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style7
      }
    },
    Style18: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point7,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style18
      }
    },
    Style19: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.info[600]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point0,
        pointSize: POINTSIZE1
      },
      pointEnd: {
        pointStyle: PointStyle.Point6,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style19
      }
    },
    Style8: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point3,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point3,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style8
      }
    },
    Style9: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.warning[700]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point6,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point6,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style9
      }
    },
    Style10: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.danger[700]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point4,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point4,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style10
      }
    },
    Style11: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point5,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point5,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style11
      }
    },
    Style12: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point2,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point2,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style12
      }
    },
    Style13: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.success[700]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point7,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point7,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style13
      }
    },
    Style14: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.info[600]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point0,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point0,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style14
      }
    },
    Style15: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point8,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point8,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style15
      }
    },
    Style16: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style10,
        color: `${colors?.dark[800]}`,
        size: STROKESIZE3
      },
      pointStart: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.None,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style16
      }
    },
    Style17: {
      direction: DIRECTION,
      strokeStyle: {
        type: LineStyle.Style0,
        color: `${colors?.danger[700]}`,
        size: STROKESIZE
      },
      pointStart: {
        pointStyle: PointStyle.Point1,
        pointSize: POINTSIZE
      },
      pointEnd: {
        pointStyle: PointStyle.Point1,
        pointSize: POINTSIZE
      },
      themeStyle:{
        quickStyleType: QuickStyleType.Style17
      }
    }
  }
}
