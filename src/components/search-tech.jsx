import React, { useMemo, useState, useRef, useEffect } from "react";
import { Search, Code2, Zap, Palette, Database, Server, Box, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import { technologies } from "@/assets/technologies";
import SelectedStack from "./selected-stack";
import GeneratedCommands from "./generated-commands";

const groupIcon = {
	framework: <Code2 className="h-4 w-4 text-blue-400" />,
	styling: <Palette className="h-4 w-4 text-pink-400" />,
	database: <Database className="h-4 w-4 text-yellow-400" />,
	backend: <Server className="h-4 w-4 text-green-400" />,
	bundler: <Zap className="h-4 w-4 text-orange-400" />,
};

export default function SearchTech() {
	const [query, setQuery] = useState("");
	const [selectedItem, setSelectedItem] = useState(-1);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState({
		language: "js",
		framework: null,
		bundler: null,
		styling: null,
	});

	const wrapRef = useRef(null);

	const fuse = useMemo(
		() => new Fuse(technologies, { keys: ["name"], threshold: 0.3 }),
		[]
	);

	const searchResults = useMemo(
		() => (query ? fuse.search(query).map((r) => r.item) : technologies),
		[query, fuse]
	);

	const canAddTech = (tech) => {
		if (tech.stack && selected.framework && !tech.stack.includes(selected.framework))
			return false;
		return true;
	};

	const results = useMemo(
		() => searchResults.filter(canAddTech),
		[searchResults, selected]
	);

	const addTech = (tech) => {
		if (!canAddTech(tech)) return;
		setSelected((prev) => ({ ...prev, [tech.group]: tech.value }));
		setQuery("");
		setSelectedItem(-1);
		setOpen(false);
	};

	const removeTech = (group) => {
		setSelected((prev) => ({ ...prev, [group]: null }));
	};

	const handleKeyDown = (e) => {
		if (!results.length) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedItem((p) => (p < results.length - 1 ? p + 1 : 0));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedItem((p) => (p > 0 ? p - 1 : results.length - 1));
		} else if (e.key === "Enter" && selectedItem >= 0) {
			e.preventDefault();
			addTech(results[selectedItem]);
		} else if (e.key === "Escape") {
			setQuery("");
			setOpen(false);
		}
	};

	useEffect(() => {
		const handler = (e) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target)) {
				setOpen(false);
				setQuery("");
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div className="w-full max-w-xl mx-auto">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-white">Build Your Stack</h2>
				<p className="text-sm text-neutral-400 mt-1">
					Select your preferred technologies to generate a project template.
				</p>
			</div>

			{/* Language Toggle */}
			<div className="flex gap-2 mb-5">
				{["js", "ts"].map((l) => (
					<button
						key={l}
						className={cn(
							"px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer",
							selected.language === l
								? "bg-white/10 text-white border-white/20 hover:bg-white/15"
								: "bg-transparent text-neutral-400 border-white/10 hover:bg-white/5 hover:text-white"
						)}
						onClick={() => setSelected((prev) => ({ ...prev, language: l }))}
					>
						{l === "js" ? "JavaScript" : "TypeScript"}
					</button>
				))}
			</div>

			{/* Search */}
			<div>
				<div ref={wrapRef} className="relative mb-6">
					<Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 z-10" />
					<input
						className="w-full pl-9 pr-4 h-10 bg-neutral-900 border border-white/10 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-white/10 focus:border-white/20 transition-all font-sans text-sm"
						placeholder="Search frameworks, databases, tools..."
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setOpen(true);
							setSelectedItem(0);
						}}
						onFocus={() => setOpen(true)}
						onKeyDown={handleKeyDown}
					/>

					{/* Dropdown */}
					{open && query && (
						<div className="absolute top-full left-0 right-0 mt-1 z-50 bg-neutral-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
							{results.length === 0 ? (
								<div className="px-4 py-6 text-center text-sm text-neutral-500">
									No results for "{query}"
								</div>
							) : (
								<ul className="max-h-64 overflow-y-auto py-1">
									{results.slice(0, 10).map((tech, index) => (
										<li
											key={tech.value}
											className={cn(
												"flex items-center gap-3 px-3 py-2 cursor-pointer text-sm transition-colors",
												selectedItem === index
													? "bg-white/10 text-white"
													: "text-neutral-300 hover:bg-white/5 hover:text-white"
											)}
											onMouseEnter={() => setSelectedItem(index)}
											onClick={() => addTech(tech)}
										>
											<span className="shrink-0">
												{groupIcon[tech.group] ?? <Box className="h-4 w-4 text-neutral-500" />}
											</span>
											<span className="font-medium flex-1">{tech.name}</span>
											<span className="text-xs text-neutral-600 uppercase tracking-wide">
												{tech.group}
											</span>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Results/Stack */}
			<div className="space-y-8">
				<SelectedStack selected={selected} removeTech={removeTech} />
				
				{Object.values(selected).some(v => v !== null && v !== "js" && v !== "ts") && (
					<div className="pb-8 border-t border-white/5 pt-6">
						<div className="flex justify-end mb-4">
							<button
								onClick={() => setSelected({ language: selected.language, framework: null, bundler: null, styling: null })}
								className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-red-400 hover:bg-red-400/5 transition-all outline-none"
							>
								<RotateCcw className="h-3 w-3" />
								Reset Stack
							</button>
						</div>
						<GeneratedCommands selected={selected} />
					</div>
				)}
			</div>
		</div>
	);
}