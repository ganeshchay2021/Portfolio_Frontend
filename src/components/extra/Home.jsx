import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { FaArrowRight } from "react-icons/fa";
import logo from "../../src/assets/logo.png"; // replace with your logo path

const Home = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "black",
        wireframes: false,
      },
    });

    // Boundaries
    const boundaries = [
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        -50,
        window.innerWidth,
        100,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 50,
        window.innerWidth,
        100,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        -50,
        window.innerHeight / 2,
        100,
        window.innerHeight,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth + 50,
        window.innerHeight / 2,
        100,
        window.innerHeight,
        { isStatic: true }
      ),
    ];
    Matter.World.add(world, boundaries);

    // Create bubbles
    const bubbles = Array.from({ length: 50 }).map(() =>
      Matter.Bodies.circle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * 10 + 5,
        {
          restitution: 0.9,
          frictionAir: 0.01, // less air resistance = faster
          render: {
            fillStyle: `hsl(${Math.random() * 360}, 80%, 60%)`,
            // fillStyle: `green`,
          },
        }
      )
    );
    Matter.World.add(world, bubbles);

    // Track mouse
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Apply floating + attraction
    Matter.Events.on(engine, "beforeUpdate", () => {
      bubbles.forEach((bubble) => {
        // Stronger upward floating
        Matter.Body.applyForce(bubble, bubble.position, {
          x: 0,
          y: -0.0003, // was -0.00005
        });

        // Stronger attraction to cursor
        const dx = mouse.x - bubble.position.x;
        const dy = mouse.y - bubble.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 400 && dist > 0) {
          const force = 0.0015; // was 0.0002 → stronger pull
          Matter.Body.applyForce(bubble, bubble.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        }
      });
    });

    // Run engine + renderer
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <section className="relative min-h-screen h-[80vh] flex items-center justify-center text-white overflow-hidden">
      
      {/* Matter.js canvas */}
      <div ref={sceneRef} className="absolute inset-0 -z-10" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full px-6">
        {/* Left Section */}
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

        {/* Right Section */}
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
