import { Money } from "../valueObjects/money";
import { Category } from "../valueObjects/category";

export class Product {
  private Id: number;
  private name: string;
  private category: Category;
  private value: Money;

  construtor(name: string, category: string, value: Money) {
    this.name = name;
    this.category = new Category(category);
    this.value = value;
  }

  getValueProduct(): number {
    return this.value.getValueMoney();
  }
}
