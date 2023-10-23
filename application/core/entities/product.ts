import { Money } from "../valueObjects/money";
import { Category } from "../valueObjects/category";

export class Product {
  private id: number;
  private name: string;
  private description: string;
  private category: Category;
  private price: Money;
  private active: boolean;
  private created_at: Date;
  private updated_at: Date;

  construtor(
    name: string,
    category: string,
    description: string,
    price: Money
  ) {
    this.name = name;
    this.category = new Category(category);
    this.description = description;
    this.price = this.price;
  }

  public getValueProduct(): number {
    return this.price.getValueMoney();
  }
}


