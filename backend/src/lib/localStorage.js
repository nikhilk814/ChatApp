import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "uploads");

// Ensure directory exists on startup
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  console.log("Uploads folder init notice:", err.message);
}

/**
 * 100% Free & Open Source local image handler.
 * Saves base64 images locally to disk.
 * Falls back to base64 if filesystem is read-only.
 * Requires ZERO external API keys, ZERO paid accounts.
 */
export const saveImageLocally = (base64String) => {
  try {
    if (!base64String) return "";

    // If it's already a URL or path, keep it
    if (!base64String.startsWith("data:image/")) {
      return base64String;
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const matches = base64String.match(/^data:image\/([A-Za-z-+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return base64String;
    }

    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const base64Data = matches[2];
    const fileName = `img_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

    return `/api/uploads/${fileName}`;
  } catch (error) {
    console.error("Local storage error, using base64 fallback:", error.message);
    return base64String;
  }
};
