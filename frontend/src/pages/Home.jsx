import React from 'react'
import Navbar from '../components/Navbar';
import Select from 'react-select';
import { useState } from 'react';
import { BsStars } from "react-icons/bs";
import { SiCodeproject } from "react-icons/si";
import Editor from '@monaco-editor/react';
import { RiFileCopyFill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa6";
import { ImNewTab } from "react-icons/im";
import { IoMdRefreshCircle } from "react-icons/io";
import { GoogleGenAI } from "@google/genai";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const Home = () => {

    // Framework options for the select dropdown
    const options = [
        // HTML & CSS Based
        { value: 'html-css', label: 'HTML + CSS' },
        { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
        { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
        { value: 'html-bulma', label: 'HTML + Bulma' },
        { value: 'html-foundation', label: 'HTML + Foundation' },
        { value: 'html-materialize', label: 'HTML + Materialize' },
        { value: 'html-semantic-ui', label: 'HTML + Semantic UI' },
        { value: 'html-uikit', label: 'HTML + UIKit' },

        // HTML with JavaScript
        { value: 'html-css-js', label: 'HTML + CSS + Vanilla JS' },
        { value: 'html-tailwind-js', label: 'HTML + Tailwind + JS' },
        { value: 'html-bootstrap-js', label: 'HTML + Bootstrap + JS' },

        // React Based
        { value: 'react', label: 'React' },
        { value: 'react-tailwind', label: 'React + Tailwind CSS' },
        { value: 'react-bootstrap', label: 'React + Bootstrap' },
        { value: 'react-material-ui', label: 'React + Material-UI' },
        { value: 'react-ant-design', label: 'React + Ant Design' },
        { value: 'react-chakra-ui', label: 'React + Chakra UI' },
        { value: 'react-styled-components', label: 'React + Styled Components' },
        { value: 'react-emotion', label: 'React + Emotion' },

        // Next.js Based
        { value: 'nextjs', label: 'Next.js' },
        { value: 'nextjs-tailwind', label: 'Next.js + Tailwind CSS' },
        { value: 'nextjs-material-ui', label: 'Next.js + Material-UI' },
        { value: 'nextjs-chakra-ui', label: 'Next.js + Chakra UI' },

        // Vue.js Based
        { value: 'vue', label: 'Vue.js' },
        { value: 'vue-tailwind', label: 'Vue.js + Tailwind CSS' },
        { value: 'vue-bootstrap', label: 'Vue.js + Bootstrap Vue' },
        { value: 'vue-vuetify', label: 'Vue.js + Vuetify' },
        { value: 'vue-quasar', label: 'Vue.js + Quasar' },
        { value: 'vue-element-plus', label: 'Vue.js + Element Plus' },

        // Nuxt.js Based
        { value: 'nuxtjs', label: 'Nuxt.js' },
        { value: 'nuxtjs-tailwind', label: 'Nuxt.js + Tailwind CSS' },
        { value: 'nuxtjs-vuetify', label: 'Nuxt.js + Vuetify' },

        // Angular Based
        { value: 'angular', label: 'Angular' },
        { value: 'angular-material', label: 'Angular + Angular Material' },
        { value: 'angular-bootstrap', label: 'Angular + ng-bootstrap' },
        { value: 'angular-tailwind', label: 'Angular + Tailwind CSS' },
        { value: 'angular-primeng', label: 'Angular + PrimeNG' },

        // Svelte Based
        { value: 'svelte', label: 'Svelte' },
        { value: 'svelte-tailwind', label: 'Svelte + Tailwind CSS' },
        { value: 'svelte-bootstrap', label: 'Svelte + Bootstrap' },
        { value: 'sveltekit', label: 'SvelteKit' },
        { value: 'sveltekit-tailwind', label: 'SvelteKit + Tailwind CSS' },

        // Other Modern Frameworks
        { value: 'solid', label: 'Solid.js' },
        { value: 'solid-tailwind', label: 'Solid.js + Tailwind CSS' },
        { value: 'preact', label: 'Preact' },
        { value: 'preact-tailwind', label: 'Preact + Tailwind CSS' },
        { value: 'lit', label: 'Lit (Web Components)' },
        { value: 'stencil', label: 'Stencil.js' },
        { value: 'alpine', label: 'Alpine.js' },
        { value: 'alpine-tailwind', label: 'Alpine.js + Tailwind CSS' },

        // Mobile Frameworks
        { value: 'react-native', label: 'React Native' },
        { value: 'flutter', label: 'Flutter (Dart)' },
        { value: 'ionic-react', label: 'Ionic + React' },
        { value: 'ionic-vue', label: 'Ionic + Vue' },
        { value: 'ionic-angular', label: 'Ionic + Angular' },

        // Backend Integration
        { value: 'django-templates', label: 'Django Templates' },
        { value: 'flask-jinja2', label: 'Flask + Jinja2' },
        { value: 'laravel-blade', label: 'Laravel Blade' },
        { value: 'rails-erb', label: 'Ruby on Rails ERB' },
        { value: 'php', label: 'PHP' },
        { value: 'asp-net', label: 'ASP.NET Razor' },

        // Static Site Generators
        { value: 'gatsby', label: 'Gatsby' },
        { value: 'gatsby-tailwind', label: 'Gatsby + Tailwind CSS' },
        { value: 'astro', label: 'Astro' },
        { value: 'astro-tailwind', label: 'Astro + Tailwind CSS' },
        { value: 'eleventy', label: '11ty (Eleventy)' },
        { value: 'jekyll', label: 'Jekyll' },
        { value: 'hugo', label: 'Hugo' },

        // CSS Frameworks & Preprocessors
        { value: 'sass-scss', label: 'HTML + SASS/SCSS' },
        { value: 'less', label: 'HTML + LESS' },
        { value: 'stylus', label: 'HTML + Stylus' },
        { value: 'postcss', label: 'HTML + PostCSS' },
    ];

    // Custom styles for the react-select component
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#1f1f2e",
            borderColor: state.isFocused ? "#3b82f6" : "#374151",
            color: "#fff",
            boxShadow: state.isFocused
                ? "0 0 0 3px rgba(59, 130, 246, 0.15), 0 10px 25px rgba(0, 0, 0, 0.3)"
                : "0 4px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            padding: "6px",
            minHeight: "48px",
            transition: "all 0.3s ease",
            "&:hover": {
                borderColor: "#4f46e5",
                transform: "translateY(-2px)",
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#1f1f2e",
            color: "#fff",
            zIndex: 1000,
            borderRadius: "12px",
            border: "1px solid #374151",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#4f46e5"
                : state.isFocused
                    ? "#2d2d3d"
                    : "#1f1f2e",
            color: "#fff",
            cursor: "pointer",
            padding: "12px 16px",
            transition: "all 0.2s ease",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        input: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#aaa",
        }),
    };

    // State management
    const [outputScreen, setOutputScreen] = useState(false); // Controls whether to show output screen or skeleton
    const [tab, setTab] = useState(1); // Controls active tab (1 = Code, 2 = Preview)
    const [prompt, setPrompt] = useState(""); // User input for component description
    const [frameWork, setFrameWork] = useState(options[0]); // Selected framework
    const [code, setCode] = useState(""); // Generated code from AI
    const [loading, setLoading] = useState(false); // Loading state
    const [refreshKey, setRefreshKey] = useState(0);

    // Function to extract code from AI response (removes markdown formatting)
    function extractCode(response) {
        const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
        return match ? match[1].trim() : response.trim();
    }

    // Initialize Google AI
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY });

    // Function to generate code using Google AI
    async function getResponse() {
        // Validate input
        if (!prompt.trim()) {
            // toast.error("Please describe your component first");
            console.error("Please describe your component first");
            return;
        }

        try {
            setLoading(true); // Show loading state

            // Generate content using Google AI
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `
                    You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

                    Now, generate a UI component for: ${prompt}  
                    Framework to use: ${frameWork.value}  

                    Requirements:  
                    - The code must be clean, well-structured, and easy to understand.  
                    - Optimize for SEO where applicable.  
                    - Focus on creating a modern, animated, and responsive UI design.  
                    - Include high-quality hover effects, shadows, animations, colors, and typography.  
                    - Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
                    - Do NOT include explanations, text, comments, or anything else besides the code.  
                    - And give the whole code in a single HTML file.
                `,
            });

            // Extract and set the generated code
            setCode(extractCode(response.text));
            setOutputScreen(true); // Show the output screen
        } catch (error) {
            console.error(error);
            // toast.error("Something went wrong while generating code");
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    const copyCode = async () => {
        if (!code.trim()) return toast.error("No code to copy");
        try {
            await navigator.clipboard.writeText(code);
            toast.success("Code copied to clipboard");
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error("Failed to copy");
        }
    };

    const downnloadFile = () => {
        if (!code.trim()) return toast.error("No code to download");

        const fileName = "GenUI-Code.html"
        const blob = new Blob([code], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("File downloaded");
    };

    // Function to open preview in new tab
    const openInNewTab = () => {
        if (!code.trim()) return toast.error("No code to preview");

        try {
            // Create a properly formatted HTML document with responsive viewport and scrolling
            const fullHtmlDocument = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Component Preview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            width: 100%;
            height: 100%;
            overflow-x: auto;
            overflow-y: auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        body {
            background: #f5f5f5;
            padding: 20px;
            min-height: 100vh;
        }
        
        .preview-container {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            min-height: calc(100vh - 40px);
        }
        
        .preview-header {
            background: #333;
            color: white;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 500;
            border-bottom: 1px solid #444;
        }
        
        .preview-content {
            width: 100%;
            min-height: calc(100vh - 80px);
            overflow: auto;
        }
        
        /* Ensure iframe content is responsive */
        iframe {
            width: 100%;
            min-height: 100%;
            border: none;
        }
        
        /* Make sure any generated content is responsive */
        .preview-content > * {
            max-width: 100%;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            🎨 Generated Component Preview - UIX AI
        </div>
        <div class="preview-content">
            ${code}
        </div>
    </div>
    
    <script>
        // Ensure proper scrolling and responsiveness
        document.addEventListener('DOMContentLoaded', function() {
            // Add responsive behavior to any elements that might overflow
            const content = document.querySelector('.preview-content');
            if (content) {
                content.style.overflowX = 'auto';
                content.style.overflowY = 'auto';
            }
            
            // Handle window resize
            window.addEventListener('resize', function() {
                document.body.style.height = window.innerHeight + 'px';
            });
        });
    </script>
</body>
</html>`;

            // Create a new window/tab
            const newWindow = window.open('', '_blank');

            if (newWindow) {
                // Write the enhanced HTML document to the new window
                newWindow.document.write(fullHtmlDocument);
                newWindow.document.close();
                toast.success("Preview opened in new tab");
            } else {
                // Fallback: create a blob URL and open it
                const blob = new Blob([fullHtmlDocument], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                toast.success("Preview opened in new tab");
            }
        } catch (error) {
            console.error('Failed to open new tab:', error);
            toast.error("Failed to open new tab");
        }
    };
    return (
        <>
            <Navbar />
            <div className='flex items-start px-[100px] justify-between gap-[30px] min-h-screen py-5'>
                {/* Left Panel - Input Form */}
                <div className='left w-[50%] min-h-[85vh] max-h-[90vh] bg-gradient-to-br from-[#141319] via-[#1a1a2f] to-[#0f0f1a] p-[30px] rounded-2xl border border-gray-700/30 shadow-2xl relative overflow-hidden backdrop-blur-sm'>
                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-cyan-500/3 rounded-full blur-xl animate-bounce delay-500"></div>

                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-50"></div>

                    {/* Content container with proper scrolling */}
                    <div className="relative z-10 h-full flex flex-col overflow-y-auto">
                        {/* Enhanced header */}
                        <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <BsStars className="text-white text-lg animate-pulse" />
                            </div>
                            <div>
                                <h3 className='text-[22px] font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm'>
                                    AI COMPONENTS GENERATOR
                                </h3>
                                <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1"></div>
                            </div>
                        </div>

                        {/* Description text */}
                        <p className='text-[14px] text-gray-300 mb-6 leading-relaxed font-light flex-shrink-0'>
                            Generate your desired UI components with the power of AI. Just tell us what you need, and we'll create it for you.
                        </p>

                        {/* Framework selection */}
                        <div className="mb-5 flex-shrink-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <p className='text-[15px] font-semibold text-white'>Choose your Framework</p>
                            </div>
                            <div className="relative">
                                <Select
                                    className='relative z-20'
                                    options={options}
                                    styles={customStyles}
                                    placeholder="Select a framework..."
                                    value={frameWork}
                                    onChange={(selectedOption) => setFrameWork(selectedOption)}
                                />
                            </div>
                        </div>

                        {/* Component description */}
                        <div className="mb-5 flex-grow flex flex-col">
                            <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                                <p className='text-[15px] font-semibold text-white'>Describe your component</p>
                            </div>
                            <div className="relative flex-grow">
                                <textarea
                                    onChange={(e) => setPrompt(e.target.value)}
                                    value={prompt}
                                    className='w-full h-[120px] bg-[#1f1f2e] border-[2px] border-gray-600 rounded-xl p-4 text-white resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-gray-500 placeholder:text-gray-400 shadow-inner text-sm'
                                    placeholder='E.g., A modern login form with email and password fields, a submit button, and a "Forgot Password?" link. Use a clean and minimalistic design with rounded corners and subtle shadows.'
                                ></textarea>

                                {/* Helper text */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-gray-500">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span>Be descriptive</span>
                                </div>
                            </div>
                        </div>

                        {/* Generate button - Fixed at bottom */}
                        <div className="flex-shrink-0 mt-auto">
                            <button
                                onClick={getResponse}
                                disabled={loading}
                                className='w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl font-bold text-[16px] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-[0.98] relative overflow-hidden group border border-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <ClipLoader size={16} color="#ffffff" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <BsStars className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                                            Generate Code
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                        </>
                                    )}
                                </span>

                                {/* Animated shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </button>

                            {/* Status indicator */}
                            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${loading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                                <span>{loading ? 'Generating Code...' : 'AI Assistant Ready'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Output Display */}
                <div className='right w-[50%] min-h-[85vh] max-h-[90vh] bg-gradient-to-br from-[#17171C] via-[#1a1a24] to-[#141319] rounded-2xl border border-gray-700/30 shadow-2xl relative overflow-hidden'>
                    {/* Show skeleton screen when no output or loading */}
                    {!outputScreen ? (
                        <>
                            {/* Loading overlay */}
                            {loading && (
                                <div className='loader absolute left-0 top-0 w-full h-full flex items-center justify-center z-20 bg-[#17171C]/80 backdrop-blur-sm'>
                                    <div className="flex flex-col items-center gap-4">
                                        <ClipLoader size={40} color="#3b82f6" />
                                        <p className="text-white text-sm">Generating your component...</p>
                                    </div>
                                </div>
                            )}

                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-10 left-10 w-20 h-20 border border-blue-500 rounded-lg rotate-12 animate-pulse"></div>
                                <div className="absolute top-32 right-16 w-16 h-16 border border-purple-500 rounded-full animate-bounce delay-300"></div>
                                <div className="absolute bottom-20 left-20 w-12 h-12 border border-cyan-500 rounded-lg rotate-45 animate-pulse delay-700"></div>
                                <div className="absolute bottom-32 right-10 w-8 h-8 border border-pink-500 rounded-full animate-ping delay-1000"></div>
                            </div>

                            {/* Grid pattern overlay */}
                            <div className="absolute inset-0 opacity-5" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                                backgroundSize: '20px 20px'
                            }}></div>

                            {/* Skeleton content */}
                            <div className='skeleton w-full h-full flex items-center flex-col justify-center relative z-10 p-8'>
                                {/* Enhanced icon container */}
                                <div className='relative mb-6'>
                                    <div className='circle p-[20px] flex items-center justify-center text-[30px] w-[75px] h-[75px] rounded-[50%] bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-2xl relative overflow-hidden'>
                                        <SiCodeproject className="relative z-10 text-white" />

                                        {/* Rotating ring */}
                                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/30 animate-spin"></div>

                                        {/* Glow effect */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl"></div>
                                    </div>

                                    {/* Floating particles */}
                                    <div className="absolute -top-2 -right-2 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping"></div>
                                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-500"></div>
                                    <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-1000"></div>
                                </div>

                                {/* Enhanced text */}
                                <div className="text-center mb-6">
                                    <h4 className="text-[18px] font-semibold text-white mb-2">Code Preview</h4>
                                    <p className='text-[15px] text-gray-300 font-medium mb-3'>Your Code & Components will appear here</p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-200"></div>
                                        <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-400"></div>
                                    </div>
                                </div>

                                {/* Feature highlights */}
                                <div className="space-y-3 text-center">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>Real-time code generation</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                                        <span>Multiple framework support</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-400"></div>
                                        <span>Instant preview & export</span>
                                    </div>
                                </div>

                                {/* Bottom decoration */}
                                <div className="mt-6 flex items-center gap-2">
                                    <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                    <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Output screen with code editor and preview */
                        <>
                            {/* Tab navigation */}
                            <div className='top bg-[#17171C] w-full h-[60px] flex items-center justify-between px-6 border-b border-gray-700/30'>
                                <button
                                    className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all text-white ${tab === 1 ? 'bg-[#333]' : 'hover:bg-[#2a2a2a]'}`}
                                    onClick={() => setTab(1)}
                                >
                                    Code
                                </button>
                                <button
                                    className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all text-white ${tab === 2 ? 'bg-[#333]' : 'hover:bg-[#2a2a2a]'}`}
                                    onClick={() => setTab(2)}
                                >
                                    Preview
                                </button>
                            </div>

                            {/* Header with action buttons */}
                            <div className='top-2 bg-[#17171C] w-full h-[45px] flex items-center justify-between px-6 border-b border-gray-700/30'>
                                <div className='left'>
                                    <p className='font-bold text-white text-sm'>
                                        {tab === 1 ? 'Code Editor' : 'Live Preview'}
                                    </p>
                                </div>
                                <div className='right flex items-center gap-3'>
                                    {tab === 1 ? (
                                        /* Code tab buttons */
                                        <>
                                            <button className='copy min-w-[80px] h-[32px] px-3 rounded-lg border border-gray-600 flex items-center justify-center gap-2 transition-all hover:bg-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-xs' onClick={copyCode}>
                                                <RiFileCopyFill className="text-sm" />
                                                Copy
                                            </button>
                                            <button className='export min-w-[80px] h-[32px] px-3 rounded-lg border border-gray-600 flex items-center justify-center gap-2 transition-all hover:bg-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-xs' onClick={downnloadFile}>
                                                <FaFileExport className="text-sm" />
                                                Export
                                            </button>
                                        </>
                                    ) : (
                                        /* Preview tab buttons */
                                        <>
                                            <button className='new-tab min-w-[90px] h-[32px] px-3 rounded-lg border border-gray-600 flex items-center justify-center gap-2 transition-all hover:bg-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-xs' onClick={openInNewTab}>
                                                <ImNewTab className="text-sm" />
                                                New Tab
                                            </button>
                                            <button className='refresh min-w-[80px] h-[32px] px-3 rounded-lg border border-gray-600 flex items-center justify-center gap-2 transition-all hover:bg-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-xs' onClick={() => setRefreshKey(prev => prev + 1)}>
                                                <IoMdRefreshCircle className="text-sm" />
                                                Refresh
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Editor/Preview content */}
                            <div className="editor h-full">
                                {tab === 1 ? (
                                    /* Code editor */
                                    <Editor
                                        height="90vh"
                                        value={code}
                                        theme="vs-dark"
                                        language="html"
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            wordWrap: 'on',
                                            automaticLayout: true,
                                        }}
                                    />
                                ) : (
                                    /* Preview iframe */
                                    <div className='w-full h-[90vh] bg-white flex items-center justify-center'>
                                        {code ? (
                                            <iframe
                                                key={refreshKey}
                                                srcDoc={code}
                                                className="w-full h-full"
                                                title="Component Preview"
                                            />
                                        ) : (
                                            <p className='text-gray-500'>Preview will be shown here</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home