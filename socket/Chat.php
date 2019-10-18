<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->onlineUsers=[];
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $msgDecode = json_decode($msg);
        if($msgDecode->action=="login"){
            $this->onlineUsers[$from->resourceId]=$msgDecode->usuario;
            $content =  json_encode($this->onlineUsers, JSON_FORCE_OBJECT);
            $this->MessageToAll("onlineUsers", $content);
        }
        // $numRecv = count($this->clients) - 1;
        // echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
        //     , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        // foreach ($this->clients as $client) {
        //     if ($from !== $client) {
        //         $client->send($msg);
        //     }
        // }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);
        unset($this->onlineUsers[$conn->resourceId]);
        $content =  json_encode($this->onlineUsers, JSON_FORCE_OBJECT);
        $this->MessageToAll("onlineUsers", $content);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

    
    private function MessageToAll($type, $content){
        foreach($this->clients as $client){
            $client->send('{"type":"'.$type.'", "data": '.$content.' }');
        }
    }
}