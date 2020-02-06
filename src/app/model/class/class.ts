
import { Product } from "../product/product";
import {User} from "../user/users"

export interface Class {
    class_id: number;
    is_default: number;
    manager_id: User;
    product: Product;
    trainer_id: User;
    name: String;
}
