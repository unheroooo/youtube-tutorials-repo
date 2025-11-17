import React, { useContext, useRef, useLayoutEffect } from "react";
import { Plane, Vec2, Vec3 } from "curtainsjs";

import "./style.scss";
import { CurtainsContext } from "../store/reduxStore";
import { vs, fs } from "./shaders.js";
// vertex and fragment shaders

const WebPlane = ({ url, title, index, description }) => {
  const { state } = useContext(CurtainsContext);
  const { scrollEffect } = state;
  const planeEl = useRef();
  const someRef = useRef({ scrollEffect: 0 });

  useLayoutEffect(() => {
    const curtains = state.curtains;
    if (state.container) {
      // 为每个索引创建不同的效果参数
      const effectConfigs = [
        { intensity: 1.0, frequency: 2.5, speed: 0.031, distortion: 0.0075 }, // Nike Free Flyknit
        { intensity: 1.5, frequency: 3.0, speed: 0.025, distortion: 0.012 }, // Jordan Air 11
        { intensity: 0.8, frequency: 2.0, speed: 0.040, distortion: 0.005 }, // Running Nike Shoe
        { intensity: 1.2, frequency: 2.8, speed: 0.028, distortion: 0.009 }, // Air Jordan 1
        { intensity: 1.8, frequency: 3.5, speed: 0.022, distortion: 0.015 }, // Nike Air Force 1
        { intensity: 2.0, frequency: 4.0, speed: 0.020, distortion: 0.018 }, // Ferrari 1990
      ];

      const config = effectConfigs[index % effectConfigs.length];

      const planeParams = {
        vertexShader: vs,
        fragmentShader: fs,
        widthSegments: 40 + (index * 5), // 不同的细分程度
        heightSegments: 40 + (index * 5),
        uniforms: {
          direction: {
            name: "uDirection",
            type: "1f",
            value: 0,
          },
          time: {
            name: "uTime",
            type: "1f",
            value: 0,
          },
          intensity: {
            name: "uIntensity",
            type: "1f",
            value: config.intensity,
          },
          frequency: {
            name: "uFrequency",
            type: "1f",
            value: config.frequency,
          },
          speed: {
            name: "uSpeed",
            type: "1f",
            value: config.speed,
          },
          distortion: {
            name: "uDistortion",
            type: "1f",
            value: config.distortion,
          },
        },
      };

      const plane = new Plane(curtains, planeEl.current, planeParams);

      plane.onRender(() => {
        plane.uniforms.time.value++;
        plane.uniforms.direction.value = someRef.current.scrollEffect / 500;
      });

      // remove plane if we're unmounting the component
      return () => {
        plane.remove();
      };
    }
  }, [state.container, state.curtains, index]);

  React.useEffect(() => {
    someRef.current.scrollEffect = scrollEffect;
  }, [scrollEffect]);

  const direction = index % 2 === 0 ? "direct" : "reverse";
  
  // 添加型号标签
  const modelTags = [
    "LIMITED EDITION",
    "RETRO CLASSIC", 
    "PERFORMANCE",
    "ICONIC STYLE",
    "PREMIUM LEATHER",
    "CONCEPT DESIGN"
  ];

  return (
    <div className={`plane-container ${direction}`}>
      <div className="plane-details">
        <h6>/{title}</h6>
        <div className="vertical-line" />
        <p>{description}</p>
        <div className="model-tag">{modelTags[index % modelTags.length]}</div>
      </div>
      <div className="plane-image" ref={planeEl}>
        <img
          src={url}
          alt={title}
          crossOrigin="anonymous"
          data-sampler="planeTexture"
        />
      </div>
    </div>
  );
};

export default WebPlane;
