import { Money } from "../valueObjects/money";
import { Category } from "../valueObjects/category";

export class Product {
  private Id: number;
  private name: string;
  private description: string;
  private category: Category;
  private value: Money;

  construtor(
    name: string,
    category: string,
    description: string,
    value: Money
  ) {
    this.name = name;
    this.category = new Category(category);
    this.description = description;
    this.value = value;
  }

  public getValueProduct(): number {
    return this.value.getValueMoney();
  }
}
