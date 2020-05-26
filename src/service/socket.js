import Ws from "@adonisjs/websocket-client";

export class SocketConnection {
  connect() {
    this.ws = Ws("ws://localhost:3333").connect();

    this.ws.on("open", (connect) => {
      console.log("[Service WSK] Conectado ao socket.io: ws://localhost:3333", {
        connect,
      });
    });

    this.ws.on("close", () => {
      console.log(
        "[Service WSK] Desconetado do socket.io: ws://localhost:3333"
      );
    });

    return this;
  }

  subscribe(channel, handler) {
    console.log({ channel });

    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000);
    } else {
      const result = this.ws.subscribe(channel);

      console.log({ result });

      result.on("message", (tweet) => {
        console.log(
          `[Service WSK] Conectado ao canal ${channel}: ${{ tweet }}`
        );
        handler(tweet);
      });

      result.on("error", (error) => {
        console.log(`[Service WSK] Erro ae se conectar no canal ${channel}`);
      });

      return result;
    }
  }
}

export default new SocketConnection();
