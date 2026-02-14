import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../models/products/iproduct.interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(
    productList: Iproduct[],
    word: string,
    field: keyof Iproduct
  ): Iproduct[] {

    if (!productList || !word || !field) return productList;

    const searchText = word.toLowerCase();

    return productList.filter((item) =>
      String(item[field] ?? '')
        .toLowerCase()
        .includes(searchText)
    );
  }
}
