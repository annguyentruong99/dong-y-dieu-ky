import { type RichContent } from "@wix/ricos";
import { RichContentViewer } from "../rich-content-viewer";

export function PostContent({ content }: { content: RichContent | undefined }) {
	return (
		<div className='px-4 py-6 md:px-8 md:py-8 lg:px-16 lg:py-10'>
			<div className='max-w-5xl mx-auto'>
				<RichContentViewer content={content} />
			</div>
		</div>
	);
}
