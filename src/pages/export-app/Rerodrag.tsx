import React, { Component, Children } from "react";
import ResizableRect from "react-resizable-rotatable-draggable";

type RerodragState = {
  width: number;
  height: number;
  top: number;
  left: number;
  rotateAngle: number;
};

class Rerodrag extends React.Component<
  { children: any; hiddenDrag?: boolean },
  RerodragState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      rotateAngle: 0
    };
  }

  handleResize = (style: any, isShiftKey: any, type: any) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    this.setState({
      top,
      left,
      width,
      height
    });
  };

  handleRotate = (rotateAngle: any) => {
    this.setState({
      rotateAngle
    });
  };

  handleDrag = (deltaX: any, deltaY: any) => {
    this.setState({
      left: this.state.left + deltaX,
      top: this.state.top + deltaY
    });
  };

  getStyle() {
    return {
      position: 'absolute',
      top: this.state.top,
      left: this.state.left,
      width: this.state.width,
      height: this.state.height,
      transform: `rotate(${this.state.rotateAngle}deg)`
    };
  }

  render() {
    const { width, top, left, height, rotateAngle } = this.state;

    return (
      <>
        {this.props.children(this.getStyle())}

        {this.props.hiddenDrag || (
          <ResizableRect
            left={left}
            top={top}
            width={width}
            height={height}
            rotateAngle={rotateAngle}
            // aspectRatio={false}
            // minWidth={10}
            // minHeight={10}
            zoomable="n, w, s, e, nw, ne, se, sw"
            // rotatable={true}
            // onRotateStart={this.handleRotateStart}
            onRotate={this.handleRotate}
            // onRotateEnd={this.handleRotateEnd}
            // onResizeStart={this.handleResizeStart}
            onResize={this.handleResize}
            // onResizeEnd={this.handleUp}
            // onDragStart={this.handleDragStart}
            onDrag={this.handleDrag}
            // onDragEnd={this.handleDragEnd}
          />
        )}
      </>
    );
  }
}

export default Rerodrag;
