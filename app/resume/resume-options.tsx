"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "../components/card";
import { resumes, getResumeUrls } from "@/data/resumes";
import { Download, ExternalLink, Eye, X } from "lucide-react";

export default function ResumeOptions() {
	const dialogRef = useRef<HTMLDialogElement>(null);
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

	useEffect(() => {
		if (previewFileId) dialogRef.current?.showModal();
	}, [previewFileId]);

	return (
        <>
          {[{ title: "Main resumes", items: resumes.slice(0, 2) }, { title: "Specialist variants & full CV", items: resumes.slice(2) }].map((group) => (
            <section key={group.title} className="mt-10">
              <h2 className="mb-6 text-2xl text-zinc-100 font-display">{group.title}</h2>
				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					{group.items.map((resume) => {
						const urls = getResumeUrls(resume.fileId);
						return (
							<Card key={resume.fileId}>
								<article className="p-4 md:p-8">
									<h3 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
										{resume.title}
									</h3>
									<p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{resume.description}
									</p>
									<div className="flex flex-wrap gap-3 mt-6">
										<button
                                            type="button"
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
            </section>
          ))}

			{previewFileId && (
              <dialog ref={dialogRef} aria-label="Resume preview" onClose={handleClosePreview} className="w-[calc(100%-2rem)] max-w-5xl h-[90vh] p-0 rounded-lg bg-zinc-900 backdrop:bg-black/80">
                <div className="flex justify-end p-3">
                  <button type="button" onClick={() => dialogRef.current?.close()} className="p-2 text-zinc-200 rounded-lg bg-zinc-800" aria-label="Close preview">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <iframe src={previewUrl} className="w-full h-[calc(100%-4rem)] border-0" title="Resume preview" />
              </dialog>
            )}
        </>
    );
}
