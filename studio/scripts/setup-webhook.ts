/**
 * Creates (or updates, if one with this name already exists) a Sanity
 * webhook that fires the Cloudflare Pages deploy hook on every publish —
 * so a Studio edit goes live without a manual git push.
 *
 * Run from studio/: npx sanity exec scripts/setup-webhook.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const DEPLOY_HOOK_URL =
  "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/ee784f63-4d53-40d8-a439-fb34dafa9f1a";
const HOOK_NAME = "Cloudflare Pages deploy";

const client = getCliClient({ apiVersion: "2025-02-19" });
const { projectId, dataset } = client.config();

type Hook = { id: string; name: string; dataset: string };

async function main() {
  console.log(`Project ${projectId} / dataset ${dataset}\n`);

  const existing = await client.request<Hook[]>({
    url: `/hooks/projects/${projectId}`,
    method: "GET",
  });
  const match = existing.find((hook) => hook.name === HOOK_NAME && hook.dataset === dataset);

  const body = {
    type: "document",
    name: HOOK_NAME,
    description: "Rebuilds the live site whenever anything is published in Studio.",
    url: DEPLOY_HOOK_URL,
    dataset,
    apiVersion: "v2025-02-19",
    httpMethod: "POST",
    rule: { on: ["create", "update", "delete"] },
  };

  if (match) {
    await client.request({ url: `/hooks/projects/${projectId}/${match.id}`, method: "PUT", body });
    console.log(`Updated existing webhook "${HOOK_NAME}" (${match.id})`);
  } else {
    const created = await client.request<{ id: string }>({
      url: `/hooks/projects/${projectId}`,
      method: "POST",
      body,
    });
    console.log(`Created webhook "${HOOK_NAME}" (${created.id})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
