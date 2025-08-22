import Image from "next/image";

export default function Home() {
	return (
	<div>
	<div>
	  <a
          className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 h-14 px-8 inline-flex items-center justify-center w-40 mr-6 hover:-translate-y-1"
          href="./about"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </a>
        
        <a
          className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 h-14 px-8 inline-flex items-center justify-center w-40 hover:-translate-y-1"
          href="./Contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
	
	 <a
          className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 h-14 px-8 inline-flex items-center justify-center w-40 hover:-translate-y-1"
          href="./login"
          target="_blank"
          rel="noopener noreferrer"
        >
        Log In
        </a>
	
	
	 </div>

	</div>         
	);
}
