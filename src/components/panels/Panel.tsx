import React, { useState, useRef, ReactNode } from "react";

interface PanelProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Panel: React.FC<PanelProps> = ({ title, onClose, children }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded shadow-lg mx-4 p-4 h-screen">
      <div className="flex justify-between w-full mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

interface PanelManagerProps {
  maxPanels: number;
}

const PanelManager: React.FC<PanelManagerProps> = ({ maxPanels }) => {
  const [panels, setPanels] = useState<string[]>([]);
  const panelRefs = useRef<((title: string) => void)[]>([]);

  const addPanel = (title: string) => {
    setPanels((prevPanels) => {
      if (prevPanels.length >= maxPanels) {
        prevPanels.shift();
      }
      return [...prevPanels, title];
    });
  };

  const removePanel = (index: number) => {
    setPanels((prevPanels) => {
      const updatedPanels = [...prevPanels];
      updatedPanels.splice(index, 1);
      return updatedPanels;
    });
  };

  const registerPanel = (panelFn: (title: string) => void) => {
    panelRefs.current.push(panelFn);
  };

  const addDynamicPanel = (title: string) => {
    if (panelRefs.current.length > 0) {
      panelRefs.current[0](title);
    }
  };

  return (
    <div className="flex flex-wrap justify-center h-screen">
      <button
        className="mb-4"
        onClick={() => addDynamicPanel(`Panel ${panels.length + 1}`)}
      >
        Add Panel
      </button>
      {panels.map((title, index) => (
        <Panel key={index} title={title} onClose={() => removePanel(index)}>
          <p>This is the content of {title}.</p>
        </Panel>
      ))}
      <PanelWrapper registerPanel={registerPanel} />
    </div>
  );
};

interface PanelWrapperProps {
  registerPanel: (panelFn: (title: string) => void) => void;
}

const PanelWrapper: React.FC<PanelWrapperProps> = ({ registerPanel }) => {
  React.useEffect(() => {
    registerPanel(addPanel);
  }, [registerPanel]);

  const addPanel = (title: string) => {
    // Here, you can add any custom logic for adding panels dynamically
    console.log(`Adding panel: ${title}`);
  };

  return null;
};

export default PanelManager;

// For Using Panel

// import React, { useRef } from 'react';
// import PanelManager from './PanelManager';

// const AnotherComponent: React.FC = () => {
//   const panelManagerRef = useRef<PanelManager>(null);

//   const addPanelToPanelManager = (title: string) => {
//     if (panelManagerRef.current) {
//       panelManagerRef.current.addDynamicPanel(title);
//     }
//   };

//   return (
//     <div>
//       <h1>Another Component</h1>
//       <PanelManager maxPanels={3} ref={panelManagerRef} />
//       <button onClick={() => addPanelToPanelManager('New Panel')}>Add Panel</button>
//     </div>
//   );
// };

// export default AnotherComponent;
