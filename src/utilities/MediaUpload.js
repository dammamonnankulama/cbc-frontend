import { createClient } from "@supabase/supabase-js";

// Load environment variables
const key = process.env.SUPABASE_KEY;
const url = process.env.SUPABASE_URL;

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.name) {
      reject("Invalid file or missing file name");
      return;
    }

    let fileName = file.name;
    const extension = fileName.split(".").pop();
    const timestamp = Date.now();

    fileName = `${timestamp}.${extension}`;

    const supabase = createClient(url, key);

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(({ error }) => {
        if (error) {
          reject(error.message);
          return;
        }

        const { data, error: urlError } = supabase.storage.from("images").getPublicUrl(fileName);
        if (urlError) {
          reject(urlError.message);
        } else {
          resolve(data.publicUrl);
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
