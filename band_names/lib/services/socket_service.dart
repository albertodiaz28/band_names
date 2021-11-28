import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:flutter/material.dart';

enum ServerStatus {
  Online,
  Offline,
  Connecting
}

class SocketService with ChangeNotifier {

  ServerStatus _serverStatus = ServerStatus.Connecting;

  get serverStatus => this._serverStatus;

  SocketService(){
    this._initConfig();
  }

  void _initConfig() {

    IO.Socket socket = IO.io('http://192.168.1.53:3001/', {
      'transports': ['websocket'],
      'autoConnect': true
    });

    socket.onConnect((_) {
      print('connect');
      this._serverStatus = ServerStatus.Online;
      notifyListeners();
    });

    socket.onDisconnect((_) { 
      print('disconnect');
      this._serverStatus = ServerStatus.Offline;
      notifyListeners();
    });

  }

}