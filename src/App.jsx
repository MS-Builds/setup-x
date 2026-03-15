import Navbar from "./components/navbar";
import Generate from "./components/generate";

function App() {
	return (
		<div className="relative min-h-screen w-full bg-neutral-950 text-white selection:bg-white/10 selection:text-white">
			<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
				<div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
				<div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
			</div>

			<div className="relative z-10 flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
					<div className="flex flex-col items-center gap-4 text-center mb-12">
						<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
							Modern Tech Stack Builder
						</h1>
						<p className="text-neutral-400 text-lg md:text-xl max-w-2xl">
							Instantly configure and generate production-ready boilerplates for your next big idea.
						</p>
					</div>
					<Generate />
				</main>
				<footer className="w-full py-8 border-t border-white/5 text-center text-neutral-500 text-sm">
					<p>&copy; {new Date().getFullYear()} setup-x. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
}

export default App;