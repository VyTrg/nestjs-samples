/*
combinations of many factory methods
*/

// factory methods
interface Chair {
  create(): void;
}

class MordenChair implements Chair {
  create(): void {
    console.log("Creating morden chair");
  }
}

class VictorianChair implements Chair {
  create(): void {
    console.log("Creating victorian chair");
  }
}

class ChairFactory {
  static createChair(type: "morden" | "victorian"): Chair {
    if (type === "morden") {
      console.log("Creating morden chair");
      return new MordenChair();
    } else {
      console.log("Creating victorian chair");
      return new VictorianChair();
    }
  }
}

interface Table {
  create(): void;
}

class MordenTable implements Table {
  create(): void {
    console.log("Creating morden table");
  }
}

class VictorianTable implements Table {
  create(): void {
    console.log("Creating victorian table");
  }
}

class TableFactory {
  static createTable(type: "morden" | "victorian"): Table {
    if (type === "morden") {
      console.log("Creating morden table");
      return new MordenTable();
    } else {
      console.log("Creating victorian table");
      return new VictorianTable();
    }
  }
}

// abstract factory
abstract class FurnitureAbstractFactory {
  abstract CreateChair(type: "morden" | "victorian"): Chair;
  abstract CreateTable(type: "morden" | "victorian"): Table;
}
class FurnitureFactory extends FurnitureAbstractFactory {
  CreateChair(type: "morden" | "victorian"): Chair {
    console.log(`Creating ${type} chair`);
    return ChairFactory.createChair(type);
  }
  CreateTable(type: "morden" | "victorian"): Table {
    console.log(`Creating ${type} table`);
    return TableFactory.createTable(type);
  }
}

const furnitureFactory = new FurnitureFactory();
const chair = furnitureFactory.CreateChair("morden");
const table = furnitureFactory.CreateTable("victorian");
