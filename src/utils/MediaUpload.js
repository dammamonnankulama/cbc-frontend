import { createClient } from "@supabase/supabase-js";


// Load environment variables

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

//const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZWV0b3h6d2l3cm92b29oZHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NDU3MDgsImV4cCI6MjA1MTIyMTcwOH0.ryvI2MMbtHx6KLDz1G8YhgIAuoRgtAxQBao5qd69cpM'
//const url = "https://dteetoxzwiwrovoohdpd.supabase.co"

const supabase = createClient(url, key);

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

    

    supabase.storage
      .from("cbc_images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(({ error }) => {
        if (error) {
          reject(error.message);
          return;
        }

        const { data, error: urlError } = supabase.storage.from("cbc_images").getPublicUrl(fileName);
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
