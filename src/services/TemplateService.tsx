import { TemplateConstant } from "@/utils/TemplateConstants";
export const TemplateService = (type: String, props: Object) => {
  switch (type) {
    case TemplateConstant.NetworkingModeTable: {
      return <div>Table Layout With Participants //TEST</div>;
    }

    case TemplateConstant.NetworkingModeTableExpanded: {
      return <div>Table Expanded View Via Props Passed</div>;
    }

    default: {
      return <div>Default Template To be Rendered</div>;
    }
  }
};
