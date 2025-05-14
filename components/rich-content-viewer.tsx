"use client";

import {
	RicosViewer,
	quickStartViewerPlugins,
	type RichContent,
} from "@wix/ricos";

const plugins = quickStartViewerPlugins();

export function RichContentViewer({
	content,
}: {
	content: RichContent | undefined;
}) {
	return <RicosViewer plugins={plugins} content={content} />;
}
