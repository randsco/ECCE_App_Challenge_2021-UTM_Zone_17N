/** @jsx jsx */
import { AllWidgetProps, React, spring, jsx, css } from 'jimu-core';
import { Slider, Label, Card, Button, ButtonGroup } from 'jimu-ui';

const { useSpring, animated, useTransition, useTrail } = spring;
const { useState } = React;

export default function Widget(props: AllWidgetProps<unknown>) {
  const [duration, setDuration] = useState(2000);

  return <div className="widget-demo-animation jimu-widget" style={{ overflow: 'auto' }} css={getStyle()}>
    <div>
      This widget demos some animations.
      <Label style={{ marginLeft: '50px' }}>
        Duration:
        <Slider style={{ width: '200px', display: 'inline-block' }} min={50} max={5000} value={duration} onChange={evt => setDuration(parseInt(evt.target.value))}></Slider>
        <span>{duration}s</span>
      </Label>
    </div>

    <div className="d-flex list">
      <Card><Fade duration={duration} /></Card>
      <Card><EnterLeave duration={duration} /></Card>
      <Card><LargeSmall duration={duration} /></Card>
      <Card><TrailFade duration={duration} /></Card>
    </div>
  </div>;
}

function getStyle() {
  return css`
    .card{
      width: 200px;
      height: 200px;
      margin: 20px;
      align-items: center;
      justify-content: center;
    }
  `;
}

function Fade({ duration }) {
  const [count, setCount] = useState(0);
  const props = useSpring({
    to: { background: 'blue' },
    from: { background: 'red' },
    config: {
      duration: duration
    },
    reset: true,
    onRest: ((evt) => {
      setCount(count + 1)
    }) as any,
  });

  const style = { left: '50px', top: '50px', width: '100px', height: '100px', color: 'white', background: 'red', ...props };
  return <animated.div style={style}>Color change: {count}</animated.div>;
}

function EnterLeave({ duration }) {
  const [items, setItems] = useState([])

  const transitions = useTransition(items, item => item, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    config: {
      duration: duration
    },
  })
  return <div>
    {transitions.map(({ item, props, key }) =>
      <animated.span key={key} style={{ display: 'inline-block', fontSize: '20px', ...props }}>{item}</animated.span>
    )}
    <ButtonGroup style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
      <Button onClick={() => setItems(items.concat([items.length]))}>Add</Button>
      <Button onClick={() => setItems(items.slice(0, items.length - 1))}>Remove</Button>
    </ButtonGroup>
  </div>
}

function LargeSmall({ duration }) {
  const [size, setSize] = useState(60);
  const props = useSpring({
    to: { width: size, height: size, borderRadius: size / 2 },
    config: {
      duration: duration
    },
  });

  const style = { background: 'red', ...props };
  return <animated.div style={style}
    onMouseEnter={() => setSize(120)}
    onMouseLeave={() => setSize(60)}
  ></animated.div>;
}

function TrailFade({ duration }) {
  const [flag, setFlag] = useState(true);
  const trail = useTrail(5, {
    opacity: flag ? 1 : 0,
    config: {
      duration: duration
    },
  });

  const style = {
    background: 'red',
    width: '30px',
    height: '30px',
    borderRadius: '15px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return <div onClick={() => setFlag(!flag)} style={containerStyle}>
    {trail.map((props, i) => {
      return <animated.div key={i} style={{ ...style, ...props }}>{i}</animated.div>
    })}
  </div>;
}


