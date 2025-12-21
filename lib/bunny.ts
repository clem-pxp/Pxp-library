const STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE!;
const API_KEY = process.env.BUNNY_STORAGE_API_KEY!;
const STORAGE_HOSTNAME = process.env.BUNNY_STORAGE_HOSTNAME!;
const CDN_HOSTNAME = process.env.BUNNY_CDN_HOSTNAME!;

export async function uploadToBunny(
  file: Buffer,
  fileName: string,
  folder: string = "",
): Promise<string> {
  const path = folder ? `${folder}/${fileName}` : fileName;
  const url = `https://${STORAGE_HOSTNAME}/${STORAGE_ZONE}/${path}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Bunny upload failed: ${response.statusText}`);
  }

  return `https://${CDN_HOSTNAME}/${path}`;
}

export async function deleteFromBunny(path: string): Promise<void> {
  const url = `https://${STORAGE_HOSTNAME}/${STORAGE_ZONE}/${path}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      AccessKey: API_KEY,
    },
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Bunny delete failed: ${response.statusText}`);
  }
}
