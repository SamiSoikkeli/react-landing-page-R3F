import React, { Suspense, useRef, useEffect } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section"
import { Canvas, useFrame } from "react-three-fiber";

import { Html, useGLTFLoader } from "drei";

//page states
import state from "./components/state";

//intesection observer
import {useInView} from "react-intersection-observer";


const Model = ({modelPath}) => {
  const gltf = useGLTFLoader(modelPath, true);
  return <primitive object={gltf.scene} dispose={null}/>;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3}/>
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[1000, 0, 0]}/>
    </>
  );
};


const HTMLContent = ({bgColor, domContent, children, modelPath, positionY}) => {

  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.001));
  const [refItem, inView] = useInView({
    threshold: 0
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -30, 0]} scale={[0.4, 0.4, 0.4]}>
          <Model modelPath={modelPath}/>
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {

  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (el) => (state.top.current = el.target.scrollTop);
  useEffect(() => void onScroll({target: scrollArea.current}), []);

  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{position:[0,0,120], fov: 70}}>
          <Lights/>
          <Suspense fallback={null}>
            <HTMLContent domContent={domContent} modelPath="yamahaLogo/scene.gltf" positionY={270}>
            <div className="container">
              <a href="#bike" className="scroll">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 16C11.7663 16.0005 11.5399 15.9191 11.36 15.77L5.36 10.77C5.15578 10.6003 5.02736 10.3564 5.00298 10.0919C4.9786 9.8275 5.06026 9.56422 5.23 9.36C5.39974 9.15578 5.64365 9.02736 5.90808 9.00298C6.1725 8.9786 6.43578 9.06026 6.64 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7063 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4698 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.9309 9.76345 18.9737 9.89432C19.0165 10.0252 19.0318 10.1635 19.0187 10.3006C19.0055 10.4376 18.9642 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16V16Z" fill="white"/>
              </svg>
              </a>
            </div>
            </HTMLContent>
            <HTMLContent domContent={domContent} modelPath="/bike.gltf" positionY={0}>
            <div id="bike" className="container">
              <h1 className="title">YAMAHA MT-09</h1>
              <h3 className="price">Starting at:<br/> $9,399*</h3>
              <p className="info">The industry benchmark in hyper naked performance and razor sharp handling with its new 890cc, triple cylinder engine and radical next‑generation design.</p>
            </div>
            </HTMLContent>
          </Suspense>  
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{position: "sticky", top: 0}} ref={domContent}></div>
        <div style={{height: `${state.sections * 100}vh`}}></div>
      </div>
    </>
  );
}
