import React, { ReactNode } from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const SideAdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-200">
        <div className="p-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>
        {/* Dynamic Sidebar Content */}
        {/* Add your dynamic sidebar content here */}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-gray-200 p-4">
          {/* Add your header content here */}
        </header>

        {/* Content Page */}
        <div className="p-4">
          {/* Add your content page content here */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default SideAdminLayout;
