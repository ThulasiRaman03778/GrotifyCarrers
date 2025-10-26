import { useState, useEffect, useRef } from "react";
import { Link} from "react-router-dom";
import { gsap } from "gsap";
import Login from "./Login";
import Register from "./Register";

const AuthPage = ({ isRegister = false }) => {
  const [isLogin, setIsLogin] = useState(!isRegister);
  const formRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // GSAP animations for form and logo
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Grotify Logo */}
        <div ref={logoRef} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">Grotify</h1>
          <p className="text-gray-500">Empowering Your Future</p>
        </div>

        {/* Form Container */}
        <div ref={formRef}>
          {isLogin ? <Login /> : <Register />}
        </div>

        {/* Toggle between Login and Register */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              to={isLogin ? "/register" : "/login"}
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-semibold hover:underline ml-1"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;