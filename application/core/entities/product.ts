import {Money} from "../valueObjects/money";
import {Category} from "../valueObjects/category";

export class Product {
  private id: number;
  private name: string;
  private description: string;
  private category: Category;
  private price: Money;
  private active: boolean;
  private created_at: Date;
  private updated_at: Date;

  constructor(
    name: string,
    category: string,
    description: string,
    price: number
  ) {
    this.name = name;
    this.category = new Category(category);
    this.description = description;
    this.price = new Money(price);
  }

  static New(id: number, name: string, description: string, category: string, price: number, active: boolean, created_at: Date, updated_at: Date): Product {
    const p = new Product(name, category, description, price)
    p.id = id;
    p.active = active;
    p.created_at = created_at;
    p.updated_at = updated_at;
    return p;
  }

  public getValueProduct(): number {
    return this.price.getValueMoney();
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCategory(): string {
    return this.category.getCategory();
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

}


