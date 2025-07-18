// src/components/Home.js
import React from "react";
import {
    ArrowRightIcon,
    DocumentTextIcon,
    CloudArrowUpIcon
} from "@heroicons/react/24/outline";



import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Navigation */}
            {/* Simple Gradient Navigation Bar */}
            <nav className="flex justify-between items-center p-6 bg-gradient-to-br from-white-600 to-indigo-600 text-blue shadow-md">
                <h1 className="text-2xl font-extrabold flex items-center gap-2">
                    <span className="text-blue-600 animate-fadeInUp">📚</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-fadeInUp hover:from-purple-600 hover:to-blue-600 transition-all duration-500">
                        College Resource Hub
                    </span>
                </h1>


                <div className="space-x-4">

                    <Link
                        to="/register"
                        className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold transition transform hover:scale-105 duration-200"
                    >
                        Get Started
                    </Link>

                </div>
            </nav>



            {/* Hero Section */}
            <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 px-6 py-12 text-white transition-all duration-500 ease-in-out rounded-lg mx-6 mt-10">
                <div className="max-w-3xl text-center animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg animate-fadeInUp">
                        Welcome to <span className="text-yellow-200">College Resource Hub 📚</span>
                    </h1>

                    <p className="text-lg sm:text-xl mb-10 drop-shadow-md">
                        Your one-stop platform to access notes, PYQs, and interview questions.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link
                            to="/login"
                            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-100 transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="mt-24 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <DocumentTextIcon className="h-10 w-10 text-blue-500 mx-auto" />
                    <h3 className="mt-4 font-semibold text-lg">Access Notes & PYQs</h3>
                    <p className="text-gray-600 mt-2 text-sm">Find well-organized notes and previous year papers for your subjects.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <CloudArrowUpIcon className="h-10 w-10 text-green-500 mx-auto" />
                    <h3 className="mt-4 font-semibold text-lg">Upload Resources</h3>
                    <p className="text-gray-600 mt-2 text-sm">Help your juniors and batchmates by sharing your useful resources.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <ArrowRightIcon className="h-10 w-10 text-purple-500 mx-auto" />
                    <h3 className="mt-4 font-semibold text-lg">Prepare for Interviews</h3>
                    <p className="text-gray-600 mt-2 text-sm">Get interview questions shared by seniors and alumni for your dream company.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto text-center text-gray-500 text-sm py-6">
                © {new Date().getFullYear()} College Resource Hub. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
