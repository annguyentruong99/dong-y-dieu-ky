import { createWixServerClient } from "@/lib/wix-server";

export async function getMember(memberId: string) {
	try {
		const wixClient = await createWixServerClient();
		const member = await wixClient.members.getMember(memberId);
		return member;
	} catch (error) {
		console.error("Error fetching member:", error);
		return null;
	}
}
