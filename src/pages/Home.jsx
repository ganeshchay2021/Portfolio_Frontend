import React, { useContext, useEffect, useRef } from "react";
import Matter from "matter-js";
import Profile from "../assets/fron_image.png";
import {
  FaArrowRight,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
} from "react-icons/si";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import Education from "../components/adminComponents/Education";
import Contact from "./Contact";
import About from "./About";

const ICONS = [
  { Comp: SiMongodb, color: "#4DB33D" },
  { Comp: FaReact, color: "#61DAFB" },
  { Comp: SiExpress, color: "#ffffff" },
  { Comp: FaHtml5, color: "#E44D26" },
  { Comp: FaCss3Alt, color: "#264de4" },
  { Comp: SiJavascript, color: "#F7DF1E" },
  { Comp: FaNodeJs, color: "#68A063" },
  { Comp: SiTailwindcss, color: "#38BDF8" },
  { Comp: SiBootstrap, color: "#7952B3" },
];

const Home = () => {
  const { logo, profile } = useContext(AppContext);

  const sceneRef = useRef(null);
  const iconRefs = useRef([]);
  const bodiesRef = useRef([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const engine = Matter.Engine.create();
    const world = engine.world;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: { width, height, background: "transparent", wireframes: false },
    });

    const walls = [
      Matter.Bodies.rectangle(width / 2, -40, width, 80, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + 40, width, 80, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(-40, height / 2, 80, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + 40, height / 2, 80, height, {
        isStatic: true,
      }),
    ];
    Matter.World.add(world, walls);

    const radius = 22;
    const bodies = ICONS.map(() =>
      Matter.Bodies.circle(
        Math.random() * width,
        Math.random() * height,
        radius,
        {
          restitution: 1,
          frictionAir: 0.01,
          friction: 0,
          frictionStatic: 0,
          density: 0.001,
          render: { fillStyle: "transparent" },
        }
      )
    );
    bodiesRef.current = bodies;
    Matter.World.add(world, bodies);

    const mouse = { x: width / 2, y: height / 2 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    Matter.Events.on(engine, "beforeUpdate", () => {
      bodies.forEach((body) => {
        Matter.Body.applyForce(body, body.position, { x: 0, y: -0.00025 });

        const dx = mouse.x - body.position.x;
        const dy = mouse.y - body.position.y;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < 500) {
          const pull = 0.002;
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * pull,
            y: (dy / dist) * pull,
          });
        }
      });
    });

    Matter.Events.on(engine, "afterUpdate", () => {
      bodies.forEach((b, i) => {
        const el = iconRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(${b.position.x}px, ${b.position.y}px) translate(-50%, -50%)`;
      });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <>
      <section className="relative fontOne min-h-scree h-[92vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* Matter.js canvas */}
        <div ref={sceneRef} className="absolute inset-0 z-0" />

        {/* Floating tech icons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {ICONS.map(({ Comp, color }, i) => (
            <div
              key={i}
              ref={(el) => (iconRefs.current[i] = el)}
              className="absolute will-change-transform"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <Comp size={36} color={color} />
            </div>
          ))}
        </div>

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full px-6 text-center md:text-left">
          {/* Left Content */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* <img src={logo} alt="Loading connecting to database please wait" className="w-12 h-12" /> */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              Ganesh Chaudhary
            </h1>

            {/* Typing Animation */}
            <ReactTyped
              strings={[
                "Flutter Developer",
                "Full Stack Web Developer",
                "MERN Stack Enthusiast",
                "Frontend And Backend Developer",

              ]}
              typeSpeed={60}
              backSpeed={40}
              backDelay={1500}
              loop
              className="text-lg text-green-400 sm:text-xl md:text-2xl "
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={"/about"}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2  shadow-lg transition"
              >
                About Me <FaArrowRight />
              </Link>
              <Link
                to={"/projects"}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 px-5 py-2 rounded- shadow-lg transition"
              >
                Projects <FaArrowRight />
              </Link>
              <Link
                target ={"_blank"}
                to={"https://drive.google.com/file/d/1RuAv92MQZ5X9UNhuswesCjZxoRk7yFZK/view?usp=sharing"}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 px-5 py-2 rounded- shadow-lg transition"
              >
                Get CV <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Right Side Logo */}
          <div className="mt-10 md:mt-0 flex justify-center">
            <img
              src={Profile}
              alt="Loading connecting to database please wait"
              className="w-48 sm:w-64 md:w-[400px] drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]"
            />
          </div>
        </div>
      </section>
      <About />
      <Education />
      <Contact />
    </>
  );
};

export default Home;
