"use server";

import { createWixServerClient } from "../wix-server";

/**
 * @description Get all categories from Wix
 * @returns The categories
 */
export async function getCategories() {
	const wixServerClient = await createWixServerClient();

	const { categories } = await wixServerClient.categories.listCategories();

	return categories;
}
