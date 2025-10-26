import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { Toaster } from 'react-hot-toast';
import { gsap } from 'gsap';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Pages/Dashboard';
import JobDetails from './Components/Jobs/JobDetails';
import JobForm from './Components/Jobs/JobForm';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const NotFound = () => {
    const cubeGridRef = useRef(null);
    const messageRef = useRef(null);
    const blinkRef = useRef(null);

    useEffect(() => {
      // Create 9x9 cube grid
      const cubes = cubeGridRef.current?.querySelectorAll('.cube');
      gsap.set(cubes, { opacity: 0, scale: 0 });

      // Animate cubes joining one by one
      gsap.to(cubes, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: {
          each: 0.03,
          grid: [9, 9],
          from: 'center',
        },
        ease: 'power2.out',
      });

      // Animate message
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.5 }
      );

      // Red light blink effect
      gsap.to(blinkRef.current, {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, []);

    // Hover animation to connect cubes
    const handleCubeHover = (e) => {
      const cube = e.currentTarget;
      gsap.to(cube, {
        scale: 1.2,
        backgroundColor: '#8b5cf6', // Purple accent
        duration: 0.3,
        ease: 'power2.out',
      });
      // Connect nearby cubes
      const index = Array.from(cubeGridRef.current.children).indexOf(cube);
      const row = Math.floor(index / 9);
      const col = index % 9;
      const nearbyCubes = [
        [row - 1, col], // Top
        [row + 1, col], // Bottom
        [row, col - 1], // Left
        [row, col + 1], // Right
      ].filter(([r, c]) => r >= 0 && r < 9 && c >= 0 && c < 9);
      nearbyCubes.forEach(([r, c]) => {
        const nearbyIndex = r * 9 + c;
        const nearbyCube = cubeGridRef.current.children[nearbyIndex];
        gsap.to(nearbyCube, {
          scale: 1.1,
          backgroundColor: '#a78bfa', // Lighter purple
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    };

    const handleCubeLeave = (e) => {
      const cube = e.currentTarget;
      gsap.to(cube, {
        scale: 1,
        backgroundColor: '#4b5563', // Gray-600
        duration: 0.3,
        ease: 'power2.out',
      });
      // Reset nearby cubes
      const index = Array.from(cubeGridRef.current.children).indexOf(cube);
      const row = Math.floor(index / 9);
      const col = index % 9;
      const nearbyCubes = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ].filter(([r, c]) => r >= 0 && r < 9 && c >= 0 && c < 9);
      nearbyCubes.forEach(([r, c]) => {
        const nearbyIndex = r * 9 + c;
        const nearbyCube = cubeGridRef.current.children[nearbyIndex];
        gsap.to(nearbyCube, {
          scale: 1,
          backgroundColor: '#4b5563',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    };

    // Click animation for blast effect
    const handleCubeClick = () => {
      const cubes = cubeGridRef.current?.querySelectorAll('.cube');
      gsap.to(cubes, {
        x: () => (Math.random() - 0.5) * 1000, // Random x direction
        y: () => (Math.random() - 0.5) * 1000, // Random y direction
        opacity: 0,
        scale: 0,
        rotation: () => Math.random() * 360,
        duration: 1,
        stagger: 0.01,
        ease: 'power3.out',
        onComplete: () => {
          // Reset cubes after blast
          gsap.set(cubes, { x: 0, y: 0, rotation: 0 });
          gsap.to(cubes, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: {
              each: 0.03,
              grid: [9, 9],
              from: 'center',
            },
            ease: 'power2.out',
          });
        },
      });
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8 relative overflow-hidden">
        {/* Red light blink background */}
        <div
          ref={blinkRef}
          className="absolute inset-0 bg-red-500 opacity-0"
        />
        <div className="text-center">
          {/* 9x9 Cube Grid */}
          <div
            ref={cubeGridRef}
            className="grid grid-cols-9 gap-1 mb-8 mx-auto w-72 h-72"
          >
            {Array.from({ length: 81 }).map((_, index) => (
              <div
                key={index}
                className="cube w-8 h-8 bg-gray-600 dark:bg-gray-700 rounded-sm cursor-pointer"
                onMouseEnter={handleCubeHover}
                onMouseLeave={handleCubeLeave}
                onClick={handleCubeClick}
              />
            ))}
          </div>
          <h1
            ref={messageRef}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            404 - Page Not Found
          </h1>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/jobs/edit/:id" element={<PrivateRoute><JobForm /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route index element={<div />} />
            <Route path="add" element={<div />} />
            <Route path="edit" element={<div />} />
            <Route path="deleted" element={<div />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;