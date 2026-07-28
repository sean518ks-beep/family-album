import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LoginForm } from "../components/forms/LoginForm";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
        redirect("/timeline");
    }

    return <LoginForm />;
}
