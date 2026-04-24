/*
create method at superclass, but subclass can implement creation with different strategies
use 'new' keyword to create instances, but use factory method to create instances
*/

interface Transport {
  deliver(): void;
}

// concrete implementation of Transport
class Truck implements Transport {
  deliver() {
    console.log("Delivering by truck");
  }
}

class Ship implements Transport {
  deliver() {
    console.log("Delivering by ship");
  }
}

abstract class Logistics {
  // factory method
  abstract createTransport(): Transport;

  planDelivery() {
    const transport = this.createTransport();
    transport.deliver();
    console.log("Delivery completed");
  }
}

class RoadLogistics extends Logistics {
  createTransport(): Transport {
    console.log("Creating road transport");
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    console.log("Creating sea transport");
    return new Ship();
  }
}

const roadLogistics = new RoadLogistics();
roadLogistics.planDelivery();

const seaLogistics = new SeaLogistics();
seaLogistics.planDelivery();
