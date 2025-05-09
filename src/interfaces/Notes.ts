export default interface INotes {
  id: number;
  notes: string;
  created_at: string;
  sessionSegment: {
    batchId: number;
    session: {
      session_name: string;
      program: {
        program_name: string;
      };
    };
  };
}
