import { UploadForm } from "@/app/components/forms/UploadForm";
import { AppHeader } from "../../components/layout/AppHeader";

export default function UploadPage() {
    return (
        <main className="min-h-screen bg-gray-100">
            <AppHeader title="投稿" />
            <section className="mx-auto mt-6 max-w-md px-4">
                <div className="rounded-xl bg-white p-4 shadow">
                    <UploadForm />
                </div>
            </section>
        </main>
    );
}