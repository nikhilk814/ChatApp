import { saveImageLocally } from "./localStorage.js";

/**
 * 100% Free & Open Source local mock for Cloudinary.
 * Stores files locally on your own server.
 * Requires NO API key, NO registration, NO paid accounts.
 */
const cloudinary = {
  config: () => {},
  uploader: {
    upload: async (file) => {
      const url = saveImageLocally(file);
      return {
        secure_url: url,
        url: url,
      };
    },
  },
};

export default cloudinary;
