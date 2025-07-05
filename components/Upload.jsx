import { genUploader } from "uploadthing/client";
import { useState } from "react";
import Loading from "./Loading";
import "./styles.css";

const ResumeUploader = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false); 

  const { uploadFiles } = genUploader();

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
    setUploaded(false); 
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    setLoading(true);
    setUploaded(false); 

    try {
      const res = await uploadFiles("resumeUploader", {
        files: [file],
      });

      const uploadedUrl = res?.[0]?.ufsUrl;
      if (uploadedUrl) {
        onSuccess(uploadedUrl);
        setUploaded(true); 
      } else {
        alert("Upload failed, no URL received.");
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload flex flex-col gap-[10px] m-auto">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2 text-[15px] border-solid border-[black] border-[1px]"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="rounded-[5px] p-[5px] bg-[#007bff] border-[0] text-[white] text-[15px] mr-auto"
      >
        {loading ? (
          <Loading />
        ) : uploaded ? (
          "Uploaded"
        ) : (
          "Upload Resume"
        )}
      </button>
    </div>
  );
};

export default ResumeUploader;
