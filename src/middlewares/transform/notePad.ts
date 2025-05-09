import INotes from "@/interfaces/Notes";

const transformNotePad = (data: any): INotes => {
  return {
    id: data.id,
    notes: data.notes,
    created_at: data.created_at,
    sessionSegment: data.sessionSegment,
  };
};

export default transformNotePad;
