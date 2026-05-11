import { UploadForm } from "@/app/components/forms/UploadForm";

export default function UploadPage() {
    return (
        <main className="min-h-screen bg-gray-100">
            {/* フォーム */}
            <section className="mx-auto mt-6 max-w-md px-4">
                <div className="rounded-xl bg-white p-4 shadow">
                    <UploadForm />
                </div>
            </section>
        </main>
    );
}