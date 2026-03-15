import { X } from "lucide-react";

export default function SelectedStack({ selected, removeTech }) {
	const entries = Object.entries(selected).filter(
		([key, val]) => key !== "language" && val !== null
	);

	return (
		<div className="mt-2">
			<p className="text-xs text-neutral-500 uppercase tracking-wide mb-3">
				Selected
			</p>
			{entries.length === 0 ? (
				<p className="text-sm text-neutral-600">Nothing selected yet.</p>
			) : (
				<div className="flex flex-wrap gap-2">
					{entries.map(([group, value]) => (
						<div
							key={group}
							className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
						>
							<div className="space-y-1">
								<div className="flex items-end justify-between gap-2">
									<span className="text-[10px] uppercase tracking-wide text-neutral-500 block leading-none mb-0.5">
										{group}
									</span>
									<button
										onClick={() => removeTech(group)}
										className="ml-1 text-neutral-500 hover:text-white transition-colors text-sm leading-none"
									>
										<X className="h-3.5 w-3.5" />
									</button>
								</div>
								<span className="text-base text-white font-mono">{value}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}