import Ws from "@adonisjs/websocket-client";

export class SocketConnection {
  connect() {
    this.ws = Ws(process.env.REACT_APP_URL_SOCKETIO).connect();

    this.ws.on("open", (connect) => {
      console.log(
        `[Service WSK] Conectado ao socket.io: ${process.env.REACT_APP_URL_SOCKETIO}`,
        {
          connect,
        }
      );
    });

    this.ws.on("close", () => {
      console.log(
        `[Service WSK] Desconetado do socket.io: ${process.env.REACT_APP_URL_SOCKETIO}`
      );
    });

    return () => {
      this.ws.close();
    };
  }

  subscribe(channel, handler) {
    const result =
      this.ws.getSubscription(channel) || this.ws.subscribe(channel);

    result.on("message", (tweet) => {
      console.log(`[Service WSK] Conectado ao canal ${channel}: ${{ tweet }}`);

      handler(tweet);
    });

    result.on("error", (error) => {
      console.log(`[Service WSK] Erro ae se conectar no canal ${channel}`, {
        error,
      });
    });

    return () => {
      console.log("entrou");
      result.close();
    };
  }
}

export default new SocketConnection();
