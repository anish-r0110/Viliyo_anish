import React, { useState } from "react";

const TimeExtendedPopover = () => {
  const [caseAnalysisTimeExtended, setCaseAnalysisTimeExtended] =
    useState(false);
  return (
    <div className="p-2 flex justify-center">
      <div className="bg-gray-50 rounded-xl p-6">
        {caseAnalysisTimeExtended && (
          <p>Trainer has extended the Case Analysis duration by ~30 minutes~</p>
        )}

        <p>Case Analysis ends in 2 mints!</p>
      </div>
    </div>
  );
};
export default TimeExtendedPopover;
