import React, { ReactElement } from "react";

interface DraggablePanelProps {
  title: string;
  onClose: () => void;
  children: ReactElement;
}

const DraggablePanel: React.FC<DraggablePanelProps> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <div className="fixed bg-white rounded-lg shadow-md border border-gray-300 w-64">
      <div className="flex justify-between items-center p-2 border-b border-gray-300">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12.293 10l4.647-4.646a1 1 0 10-1.414-1.414L10 8.586 5.354 3.94a1 1 0 10-1.414 1.414L8.586 10l-4.647 4.646a1 1 0 101.414 1.414L10 11.414l4.646 4.647a1 1 0 101.414-1.414L11.414 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default DraggablePanel;
