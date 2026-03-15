import React from "react";
import Logo from "../assets/logo.svg";
import { Github } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-950/50 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<a href="/" className="flex items-center gap-2">
					<img
						src={Logo}
						alt="setup-x logo"
						className="h-6 w-6 opacity-90 transition-opacity duration-200 hover:opacity-100"
					/>
				</a>
				{/* Socials */}
				<div className="flex items-center gap-4">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
						title="GitHub"
					>
						<Github className="h-5 w-5" />
					</a>
				</div>
			</div>
		</nav>
	);
}
