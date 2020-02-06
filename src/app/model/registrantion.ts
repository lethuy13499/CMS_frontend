import { Product } from "./product/product";
import { Class } from "./class/class";
import { User } from "./user/users";

export class Registrantion {
    registrantionId: number;
    status: number;
    product: Product = new Product();
    class1: Class;
    user: User = new User();
    startDate: Date ;
    endDate: Date;
    discription: string;

}