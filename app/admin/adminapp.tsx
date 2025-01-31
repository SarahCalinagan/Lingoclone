"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminApp = () => {
    return (
        <div>
            <App />
        </div>
    );
};

export default AdminApp;