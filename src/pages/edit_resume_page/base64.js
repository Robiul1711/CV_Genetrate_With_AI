export const imageToBase64 = async (url) => {
  const response = await fetch(url, { mode: "cors" });
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Base64 string
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
