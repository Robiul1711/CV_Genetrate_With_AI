// import React, { useState } from "react";
// import * as htmlToImage from "html-to-image";
// import jsPDF from "jspdf";
// import Swal from "sweetalert2";
// import { useAuth } from "@/hooks/useAuth";
// import { useLocation } from "react-router-dom";
// import { useEmail } from "@/hooks/useEmail";
// import { useStatusCheck } from "./useStatusCheck";
// import { useResume } from "@/providers/ResumeContext";

// const DownloadButton = ({ resumeRef }) => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const { setAllResumeData,imageset, setImageSet } = useResume();
//   const { language } = useEmail(); // expected to return "en" or "de"
//   const { data: status } = useStatusCheck();
//   const messages = {
//     en: {
//       downloadButton: "Download as PDF",
//       downloading: "Downloading...",
//       errorTitle: "Error",
//       errorImage: "Please upload an image to your CV.",
//       noSubTitle: "Upgrade Subscription Plan",
//       noSubText: "Please upgrade your subscription plan to continue.",

//       upgradePlan: "Upgrade Plan",
//       close: "Close",
//     },
//     de: {
//       downloadButton: "Als PDF herunterladen",
//       downloading: "Wird heruntergeladen...",
//       errorTitle: "Fehler",
//       errorImage: "Bitte laden Sie ein Bild für Ihren Lebenslauf hoch.",
//       noSubTitle: "Abonnementplan aktualisieren",
//       noSubText:
//         "Bitte aktualisieren Sie Ihren Abonnementplan, um fortzufahren",
//       upgradePlan: "Tarif upgraden",
//       close: "Schließen",
//     },
//   };
//   const t = messages[language] || messages.en;

//   const resumeName =
//     location.pathname === "/dashboard/create-cover-letter"
//       ? "cover_letter"
//       : "resume";

//   console.log(status);

//   // Wait until all images are loaded
//   // const waitForImages = async (element) => {
//   //   const images = Array.from(element.querySelectorAll("img"));
//   //   await Promise.all(
//   //     images.map(
//   //       (img) =>
//   //         new Promise((resolve) => {
//   //           img.crossOrigin = "anonymous";
//   //           if (img.complete) resolve(true);
//   //           else img.onload = img.onerror = () => resolve(true);
//   //         })
//   //     )
//   //   );
//   // };

//   // const waitForFonts = async () => {
//   //   if (document.fonts) {
//   //     await document.fonts.ready;
//   //   }
//   // };
//   console.log(status);
//   const handleDownloadPDF = async () => {
//     if (!resumeRef.current) return;
//     try {
//       setLoading(true);
//       // await waitForFonts();
//       // await waitForImages(resumeRef.current);

//       const dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
//         quality: 1,
//         pixelRatio: 1.8,
//         cacheBust: true, // avoids caching issues that trigger CORS
//         // optional: fallback placeholder for blocked images
//         imagePlaceholder:
//           `${import.meta.env.VITE_IMAGE_URL}${imageset}`,
//       });

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = pdf.getImageProperties(dataUrl);
//       const imgWidth = pdfWidth;
//       const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

//       pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
//       pdf.save(`${resumeName}.pdf`);
//     } catch (err) {
//       console.error(err);
//       Swal.fire(
//         language === "de" ? "Fehler" : "Error",
//         language === "de"
//           ? "Beim Erstellen Ihres Dokuments ist ein Problem aufgetreten. Ihr Profilbild fehlt oder konnte nicht geladen werden. Bitte laden Sie Ihr Profilbild erneut hoch und versuchen Sie es noch einmal."
//           : "We encountered an issue while preparing your document. It seems your profile image is missing or couldn’t be loaded. Please re-upload your profile image and try again..",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const canDownload = () => {
//     const sub = status?.has_subscription;
//     if (!sub) return false;
//     return true;

//     // const now = new Date();
//     // const startDate = sub.start_date ? new Date(sub.start_date) : null;
//     // const endDate = sub.end_date ? new Date(sub.end_date) : null;

//     // const inDateRange =
//     //   startDate && endDate ? now >= startDate && now <= endDate : false;

//     // return inDateRange || sub.pay_per_download_credits > 0;
//   };

//   const handleDownload = async () => {
//     if (!canDownload()) {
//       Swal.fire({
//         title: t.noSubTitle,
//         text: t.noSubText,
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#000",
//         cancelButtonColor: "#d33",
//         confirmButtonText: t.upgradePlan,
//         cancelButtonText: t.close,
//       }).then((result) => {
//         if (result.isConfirmed) window.location.href = "/price";
//       });
//       return;
//     }
//     await handleDownloadPDF();
//   };

//   return (
//     <div className="text-center mb-4">
//       <button
//         type="button"
//         onClick={handleDownload}
//         className={`bg-black text-white border-[1px] border-white px-5 py-2 rounded hover:bg-gray-800 transition-all ${
//           loading ? "cursor-not-allowed opacity-70" : ""
//         }`}
//         disabled={loading}
//       >
//         {loading
//           ? language === "de"
//             ? "Wird heruntergeladen..."
//             : "Downloading..."
//           : language === "de"
//           ? "Als PDF herunterladen"
//           : "Download as PDF"}
//       </button>
//     </div>
//   );
// };

// export default DownloadButton;


import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useEmail } from "@/hooks/useEmail";
import { useStatusCheck } from "./useStatusCheck";
import { useResume } from "@/providers/ResumeContext";

const DownloadButton = ({ resumeRef }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { imageset } = useResume();
  const { language } = useEmail(); // expected to return "en" or "de"
  const { data: status } = useStatusCheck();

  const messages = {
    en: {
      downloadButton: "Download as PDF",
      downloading: "Downloading...",
      errorTitle: "Error",
      errorImage:
        "We encountered an issue while preparing your document. It seems your profile image is missing or couldn’t be loaded. Please re-upload your profile image and try again.",
      noSubTitle: "Upgrade Subscription Plan",
      noSubText: "Please upgrade your subscription plan to continue.",
      upgradePlan: "Upgrade Plan",
      close: "Close",
    },
    de: {
      downloadButton: "Als PDF herunterladen",
      downloading: "Wird heruntergeladen...",
      errorTitle: "Fehler",
      errorImage:
        "Beim Erstellen Ihres Dokuments ist ein Problem aufgetreten. Ihr Profilbild fehlt oder konnte nicht geladen werden. Bitte laden Sie Ihr Profilbild erneut hoch und versuchen Sie es noch einmal.",
      noSubTitle: "Abonnementplan aktualisieren",
      noSubText:
        "Bitte aktualisieren Sie Ihren Abonnementplan, um fortzufahren.",
      upgradePlan: "Tarif upgraden",
      close: "Schließen",
    },
  };

  const t = messages[language] || messages.en;

  const resumeName =
    location.pathname === "/dashboard/create-cover-letter"
      ? "cover_letter"
      : "resume";

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      setLoading(true);

      const dataUrl = await htmlToImage.toJpeg(resumeRef.current, {
        quality: 1,
        pixelRatio: 1.8,
        cacheBust: true,
        imagePlaceholder: `${import.meta.env.VITE_IMAGE_URL}${imageset}`,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, finalHeight);
      pdf.save(`${resumeName}.pdf`);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: t.errorTitle,
        html: `<p style="color:#c7c7c7; font-size:15px;">${t.errorImage}</p>`,
        iconHtml: `
          <div style="
            width:70px;
            height:70px;
            border:3px solid #00d084;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            background-color:#000;
            margin:0 auto;
          ">
            <i class='fas fa-exclamation' style="color:#00d084; font-size:32px;"></i>
          </div>
        `,
        background: "#0d0d0d",
        color: "#eaeaea",
        confirmButtonText: "OK",
        confirmButtonColor: "#00d084",
        customClass: {
          popup: "rounded-2xl shadow-lg border border-[#1f1f1f]",
          confirmButton: "text-white font-medium px-6 py-2 rounded-lg",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const canDownload = () => {
    const sub = status?.has_subscription;
    if (!sub) return false;
    return true;
  };

  const handleDownload = async () => {
    if (!canDownload()) {
      Swal.fire({
        title: t.noSubTitle,
        html: `<p style="color:#c7c7c7; font-size:15px;">${t.noSubText}</p>`,
        iconHtml: `
          <div style="
            width:70px;
            height:70px;
            border:3px solid #00d084;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            background-color:#000;
            margin:0 auto;
          ">
            <i class='fas fa-arrow-up' style="color:#00d084; font-size:32px;"></i>
          </div>
        `,
        background: "#0d0d0d",
        color: "#eaeaea",
        showCancelButton: true,
        confirmButtonText: t.upgradePlan,
        cancelButtonText: t.close,
        confirmButtonColor: "#00d084",
        cancelButtonColor: "#333",
        customClass: {
          popup: "rounded-2xl shadow-lg border border-[#1f1f1f]",
          confirmButton: "text-white font-medium px-6 py-2 rounded-lg",
          cancelButton: "text-gray-300 font-medium px-6 py-2 rounded-lg",
        },
      }).then((result) => {
        if (result.isConfirmed) window.location.href = "/price";
      });
      return;
    }

    await handleDownloadPDF();
  };

  return (
    <div className="text-center mb-4">
      <button
        type="button"
        onClick={handleDownload}
        className={`bg-black text-white border-[1px] border-white px-5 py-2 rounded hover:bg-gray-800 transition-all ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
        disabled={loading}
      >
        {loading
          ? language === "de"
            ? t.downloading
            : t.downloading
          : language === "de"
          ? t.downloadButton
          : t.downloadButton}
      </button>
    </div>
  );
};

export default DownloadButton;
