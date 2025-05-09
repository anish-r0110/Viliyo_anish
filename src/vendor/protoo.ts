import protooClient from 'protoo-client';

class ProtooClient {
  private static instance: ProtooClient;
  public peer: protooClient.Peer;
  public transport : protooClient.WebSocketTransport;

  private constructor( url:string ) {
    // Creating a WebSocket transport with the specified URL and port
    const transport = new protooClient.WebSocketTransport( url );
    this.transport = transport
    this.peer = new protooClient.Peer(transport);
  }

  public static getInstance( url:string ): ProtooClient {
    if (!ProtooClient.instance) {
      ProtooClient.instance = new ProtooClient(url);
    }
    return ProtooClient.instance;
  }

  public getPeer(): protooClient.Peer {
    return this.peer;
  }
}

export default ProtooClient;
