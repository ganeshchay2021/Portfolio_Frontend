import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { FaArrowRight, FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiJavascript, SiTailwindcss, SiBootstrap } from "react-icons/si";
import logo from "../../src/logoN.png"; // <- your logo

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
  const sceneRef = useRef(null);
  const iconRefs = useRef([]);         // DOM nodes for the icons
  const bodiesRef = useRef([]);        // Matter bodies (one per icon)

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const engine = Matter.Engine.create();
    const world = engine.world;

    // Transparent renderer sits behind content
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });

    // Walls (screen bounds)
    const walls = [
      Matter.Bodies.rectangle(width / 2, -40, width, 80, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + 40, width, 80, { isStatic: true }),
      Matter.Bodies.rectangle(-40, height / 2, 80, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + 40, height / 2, 80, height, { isStatic: true }),
    ];
    Matter.World.add(world, walls);

    // Create a body for each icon
    const radius = 22; // visual size matches icon ~36px nicely
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
          render: { fillStyle: "transparent" }, // we draw icons via DOM overlay
        }
      )
    );
    bodiesRef.current = bodies;
    Matter.World.add(world, bodies);

    // Mouse tracking for attraction
    const mouse = { x: width / 2, y: height / 2 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // Physics behavior: float + attract-to-cursor
    Matter.Events.on(engine, "beforeUpdate", () => {
      bodies.forEach((body) => {
        // make them float upward a bit
        Matter.Body.applyForce(body, body.position, { x: 0, y: -0.00025 });

        // attraction to cursor
        const dx = mouse.x - body.position.x;
        const dy = mouse.y - body.position.y;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < 500) {
          const pull = 0.002; // attraction strength
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * pull,
            y: (dy / dist) * pull,
          });
        }
      });
    });

    // After each physics step, sync DOM icon positions to body positions
    Matter.Events.on(engine, "afterUpdate", () => {
      bodies.forEach((b, i) => {
        const el = iconRefs.current[i];
        if (!el) return;
        // Center icon on body position
        el.style.transform = `translate(${b.position.x}px, ${b.position.y}px) translate(-50%, -50%)`;
      });
    });

    // Start
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", onMove);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Matter.js canvas behind everything */}
      <div ref={sceneRef} className="absolute inset-0 z-0" />

      {/* DOM overlay that follows physics bodies */}
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
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full px-6">
        {/* Left */}
        <div className="flex flex-col items-start space-y-6">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <h1 className="text-4xl md:text-6xl font-bold">Nitesh Kumar</h1>
          <p className="text-lg text-gray-300">MERN Stack Developer</p>

          <div className="flex space-x-4">
            <a
              href="#about"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2 rounded-lg shadow-lg transition"
            >
              About Me <FaArrowRight />
            </a>
            <a
              href="#works"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 px-5 py-2 rounded-lg shadow-lg transition"
            >
              Latest Works <FaArrowRight />
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="mt-10 md:mt-0">
          <img
            src={logo}
            alt="Big Logo"
            className="w-72 md:w-[400px] drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
