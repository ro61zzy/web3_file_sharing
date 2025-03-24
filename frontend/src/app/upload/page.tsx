import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Upload Your File</h1>
        <UploadForm />
      </div>
    </main>
  );
}
