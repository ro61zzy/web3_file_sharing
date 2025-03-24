import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          Upload Your File
        </h1>
        <UploadForm />
      </div>
    </main>
  );
}
