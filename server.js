const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const { IdExist, UpdateArrayData } = require('./utlility')
const parser = require('socket.io-msgpack-parser')
const io = new Server(server, {
  // wsEngine: require('eiows').Server,
})
let Port = 3000
let Drivers = []

io.on('connection', (socket) => {
  socket.on('connectDriver', async (Data) => {
    Data.SocketId = socket.id
    const { DriverId } = Data

    if (IdExist(DriverId, Drivers, 'DriverId')) {
      UpdateArrayData(Data, Drivers, DriverId, 'DriverId')
      console.log(Drivers)
      console.log(`already`)
    } else {
      Drivers.push(Data)
      console.log(Drivers.length)
      io.sockets.emit('UserList', Data)
    }
  })

  socket.on('disconnect', async () => {
    if (IdExist(socket.id, Drivers, 'SocketId')) {
      RemoveFromArray(socket.id, Drivers, 'SocketId')
      console.log(Drivers)
    }
  })
})

server.listen(Port, () => {
  console.log(`listening on *:${Port}`)
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })
let RemoveFromArray = (id, arr, Param) => {
  Drivers = arr.filter((x) => x[Param] != id)
}
