import { isAdmin } from "@/lib/admin";
import AdminApp from "./adminapp";
import { redirect } from "next/navigation";

const AdminPage = () => {

    if (!isAdmin()) {
        redirect("/");
    }
    
    return (
        <div>
            <AdminApp />
        </div>
    );
};

export default AdminPage;
