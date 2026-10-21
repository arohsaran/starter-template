import "client-only";
import PocketBase, { LocalAuthStore } from "pocketbase";

// Find your PocketBase link in the LMS and replace the placeholder below.
// Optional: NEXT_PUBLIC_POCKETBASE_URL overrides this value.
export const dbUrl = (
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://????.pockethost.io"
).replace(/\/+$/, "");
// Keep the auth forms disabled until the placeholder is replaced.
export const isPocketBaseConfigured = !dbUrl.includes("?");
export const pb = new PocketBase(
  dbUrl,
  new LocalAuthStore(`pocketbase:${dbUrl}`),
);

// A stable primitive for cache keys and React's auth-store subscription.
export function getAccountKey() {
  const record = pb.authStore.isValid ? pb.authStore.record : null;
  return record ? `${record.collectionId}:${record.id}` : "anonymous";
}
