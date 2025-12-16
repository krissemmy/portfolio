"use client";
import { useState } from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { resumes, getResumeUrls } from "@/data/resumes";
import { Download, ExternalLink, Eye, X } from "lucide-react";

export default function ResumePage() {
	const [previewFileId, setPreviewFileId] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const handlePreview = (fileId: string) => {
		const urls = getResumeUrls(fileId);
		setPreviewUrl(urls.previewUrl);
		setPreviewFileId(fileId);
	};

	const handleClosePreview = () => {
		setPreviewFileId(null);
		setPreviewUrl("");
	};

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Resume
					</h2>
					<p className="mt-4 text-zinc-400">
						My professional resumes and documents.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					{resumes.map((resume) => {
						const urls = getResumeUrls(resume.fileId);
						return (
							<Card key={resume.fileId}>
								<article className="p-4 md:p-8">
									<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
										{resume.title}
									</h2>
									<p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{resume.description}
									</p>
									<div className="flex gap-4 mt-6">
										<button
											onClick={() => handlePreview(resume.fileId)}
											className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-200 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
										>
											<Eye className="w-4 h-4" />
											Preview
										</button>
										<a
											href={urls.downloadUrl}
											download
											className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-200 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
										>
											<Download className="w-4 h-4" />
											Download
										</a>
										<a
											href={urls.driveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-200 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
										>
											<ExternalLink className="w-4 h-4" />
											Open in Drive
										</a>
									</div>
								</article>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Preview Modal */}
			{previewFileId && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
					onClick={handleClosePreview}
				>
					<div
						className="relative w-full h-full max-w-5xl max-h-[90vh] m-4 bg-zinc-900 rounded-lg overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={handleClosePreview}
							className="absolute top-4 right-4 z-10 p-2 text-zinc-400 bg-zinc-800 rounded-full hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
							aria-label="Close preview"
						>
							<X className="w-5 h-5" />
						</button>
						<iframe
							src={previewUrl}
							className="w-full h-full border-0"
							title="Resume preview"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

