const HOST = "dilee.vercel.app";
const KEY = "f8a37912423a419894e6bf7f293b6e89";
const URLS = [`https://${HOST}/`, `https://${HOST}/llms.txt`, `https://${HOST}/llms-full.txt`];

async function submitIndexNow() {
  console.log(`Submitting ${URLS.length} URLs to IndexNow (${HOST})...`);
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: URLS,
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(
        `✅ Successfully submitted ${URLS.length} URLs to IndexNow! (HTTP ${response.status})`
      );
    } else {
      console.warn(`⚠️ IndexNow responded with status ${response.status}: ${response.statusText}`);
      const text = await response.text();
      if (text) console.warn(text);
    }
  } catch (error) {
    console.error("❌ Failed to ping IndexNow:", error.message);
  }
}

submitIndexNow();
