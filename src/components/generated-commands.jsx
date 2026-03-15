import React, { useState } from "react";
import { Copy, Check, Terminal, Package, Settings } from "lucide-react";
import { techStarterCommands } from "../assets/tech-commands";

export default function GeneratedCommands({ selected }) {
	const [copied, setCopied] = useState(null);
	const { language } = selected;

	const activeEntries = Object.entries(selected).filter(([key, val]) => val !== null);
	if (activeEntries.length <= 1) return null;

	const steps = {
		init: null,
		install: [],
		config: [],
	};

	activeEntries.forEach(([group, value]) => {
		if (group === "language") return;
		const cmdObj = techStarterCommands[value];
		if (!cmdObj) return;

		const initCmd = cmdObj.init(language);
		const installCmd = cmdObj.install ? cmdObj.install(language) : null;

		// Step 1: Initialization (Primary Framework/Runtime/Bundler)
		if (["framework", "runtime", "bundler", "backend"].includes(group) && !steps.init && !initCmd.startsWith("npm install") && !initCmd.startsWith("#")) {
			steps.init = { name: value, command: initCmd };
		} else {
			// Step 2: Dependencies
			if (initCmd && !initCmd.startsWith("#")) {
				steps.install.push(initCmd);
			}
			if (installCmd) {
				steps.install.push(`npm install ${installCmd}`);
			}
		}

		// Step 3: Config/Notes
		if (cmdObj.note) {
			steps.config.push({ name: value, text: cmdObj.note });
		}
	});

	const handleCopy = (text, id) => {
		navigator.clipboard.writeText(text);
		setCopied(id);
		setTimeout(() => setCopied(null), 2000);
	};

	return (
		<div className="mt-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Step 1: Initialisation */}
			{steps.init && (
				<section className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400 border border-blue-500/20">
							1
						</div>
						<h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
							<Terminal className="h-3.5 w-3.5" />
							Initialize Project
						</h3>
					</div>
					<div className="group relative">
						<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onClick={() => handleCopy(steps.init.command, 'init')}
								className="p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
							>
								{copied === 'init' ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-neutral-400" />}
							</button>
						</div>
						<div className="p-4 rounded-xl bg-neutral-900 border border-white/5 font-mono text-sm text-white/90 overflow-x-auto">
							<span className="text-blue-400 mr-2">$</span>
							{steps.init.command}
						</div>
					</div>
				</section>
			)}

			{/* Step 2: Dependencies */}
			{steps.install.length > 0 && (
				<section className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-[10px] font-bold text-purple-400 border border-purple-500/20">
							{steps.init ? 2 : 1}
						</div>
						<h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
							<Package className="h-3.5 w-3.5" />
							Install Dependencies
						</h3>
					</div>
					<div className="group relative">
						<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onClick={() => handleCopy(steps.install.join(" && "), 'install')}
								className="p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
							>
								{copied === 'install' ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-neutral-400" />}
							</button>
						</div>
						<div className="p-4 rounded-xl bg-neutral-900 border border-white/5 font-mono text-sm text-white/90 overflow-x-auto space-y-1">
							{steps.install.map((cmd, i) => (
								<div key={i}>
									<span className="text-purple-400 mr-2">$</span>
									{cmd}
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Step 3: Configuration */}
			{steps.config.length > 0 && (
				<section className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-[10px] font-bold text-orange-400 border border-orange-500/20">
							{steps.init && steps.install.length > 0 ? 3 : (steps.init || steps.install.length > 0 ? 2 : 1)}
						</div>
						<h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
							<Settings className="h-3.5 w-3.5" />
							Configuration & Setup
						</h3>
					</div>
					<div className="grid gap-3">
						{steps.config.map((note, i) => (
							<div key={i} className="p-4 rounded-xl bg-neutral-900 border border-white/5 space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">{note.name}</span>
									<button
										onClick={() => handleCopy(note.text, `note-${i}`)}
										className="p-1 rounded hover:bg-white/5 transition-colors"
									>
										{copied === `note-${i}` ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-neutral-600" />}
									</button>
								</div>
								<div className="text-sm text-neutral-400 leading-relaxed font-sans">
									{note.text.split('\n').map((line, j) => (
										<p key={j} className={line.startsWith('FROM') || line.startsWith('WORKDIR') ? 'font-mono text-xs bg-black/30 p-2 rounded mt-2 text-white/70' : ''}>
											{line}
										</p>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
