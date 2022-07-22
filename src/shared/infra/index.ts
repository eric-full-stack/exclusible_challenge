import httpServer from './http/server';
import wsServer from './ws/server';

//initialize http
const server = httpServer.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}!`);
});

//initialize ws
wsServer(server);
