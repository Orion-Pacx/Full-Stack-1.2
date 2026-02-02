const { useState, useRef, useEffect } = React;

function App() {
  const svgRef = useRef(null);
  const isDrawingRef = useRef(false);
  const startPointRef = useRef(null);

  const [mode, setMode] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [undoStack, setUndoStack] = useState([]);

  const getPoint = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e) => {
    const p = getPoint(e);
    isDrawingRef.current = true;
    startPointRef.current = p;

    if (mode === "pen") {
      setCurrentPath({
        type: "path",
        d: `M ${p.x} ${p.y}`,
        color,
        strokeWidth
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const p = getPoint(e);

    if (mode === "pen" && currentPath) {
      setCurrentPath(prev => ({
        ...prev,
        d: prev.d + ` L ${p.x} ${p.y}`
      }));
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const p = getPoint(e);
    let shape = null;

    const s = startPointRef.current;

    if (mode === "line") {
      shape = { type:"line", x1:s.x, y1:s.y, x2:p.x, y2:p.y, color, strokeWidth };
    }
    if (mode === "rect") {
      shape = {
        type:"rect",
        x: Math.min(s.x,p.x),
        y: Math.min(s.y,p.y),
        w: Math.abs(p.x-s.x),
        h: Math.abs(p.y-s.y),
        color, strokeWidth
      };
    }
    if (mode === "circle") {
      const r = Math.hypot(p.x-s.x, p.y-s.y);
      shape = { type:"circle", cx:s.x, cy:s.y, r, color, strokeWidth };
    }

    if (mode === "pen" && currentPath) {
      setPaths(prev => [...prev, currentPath]);
      setUndoStack([]);
      setCurrentPath(null);
    }

    if (shape) {
      setPaths(prev => [...prev, shape]);
      setUndoStack([]);
    }
  };

  const undo = () => {
    if (!paths.length) return;
    const last = paths[paths.length - 1];
    setUndoStack(prev => [...prev, last]);
    setPaths(prev => prev.slice(0, -1));
  };

  const clearAll = () => {
    setPaths([]);
    setUndoStack([]);
  };

  useEffect(() => {
    const keyHandler = e => {
      if (e.ctrlKey && e.key === "z") undo();
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });

  return React.createElement("div",{className:"app-container"},

    React.createElement("section",{className:"hero"},
      React.createElement("h1",null,"🎨 SVG Drawing Tool"),
      React.createElement("p",null,"Draw using SVG paths, shapes and real-time mouse events")
    ),

    React.createElement("div",{className:"toolbar"},
      ["pen","line","rect","circle"].map(m =>
        React.createElement("button",
          { key:m, className:mode===m?"active":"", onClick:()=>setMode(m) },
          m
        )
      ),
      React.createElement("input",{type:"range",min:1,max:10,value:strokeWidth,onChange:e=>setStrokeWidth(+e.target.value)}),
      ["#000","#e11","#16a","#16a34a","#ca8a04","#9333ea","#db2777","#0891b2","#444","#f97316"]
        .map(c=>React.createElement("button",
          {key:c,className:"color-btn",style:{background:c},onClick:()=>setColor(c)})),
      React.createElement("button",{onClick:undo},"Undo"),
      React.createElement("button",{onClick:clearAll},"Clear")
    ),

    React.createElement("div",{className:"canvas-wrapper"},
      React.createElement("svg",{
        ref:svgRef,
        width:500,
        height:500,
        onMouseDown:handleMouseDown,
        onMouseMove:handleMouseMove,
        onMouseUp:handleMouseUp
      },
        paths.map((p,i)=>{
          if(p.type==="path") return React.createElement("path",{key:i,d:p.d,fill:"none",stroke:p.color,strokeWidth:p.strokeWidth});
          if(p.type==="line") return React.createElement("line",{key:i,x1:p.x1,y1:p.y1,x2:p.x2,y2:p.y2,stroke:p.color,strokeWidth:p.strokeWidth});
          if(p.type==="rect") return React.createElement("rect",{key:i,x:p.x,y:p.y,width:p.w,height:p.h,fill:"none",stroke:p.color,strokeWidth:p.strokeWidth});
          if(p.type==="circle") return React.createElement("circle",{key:i,cx:p.cx,cy:p.cy,r:p.r,fill:"none",stroke:p.color,strokeWidth:p.strokeWidth});
        }),
        currentPath && React.createElement("path",{d:currentPath.d,fill:"none",stroke:currentPath.color,strokeWidth:currentPath.strokeWidth})
      )
    ),

    React.createElement("div",{className:"stats"},
      React.createElement("div",null,"Shapes: "+paths.length),
      React.createElement("div",null,"Undo stack: "+undoStack.length)
    )
  );
}

ReactDOM.createRoot(document.getElementById("root"))
  .render(React.createElement(App));
