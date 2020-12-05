import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { categories } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiServer = 'https://crudcrud.com/api/28adbd2b1acc40cd8d342a4225ca0c62';
  httpOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
  private _items: any;
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<categories> {
    const categoryType = '/' + product.categoryType + '/';
    return this.httpClient.post<categories>(this.apiServer + categoryType, JSON.stringify(product), this.httpOptions);
  }

  getAll(product): Observable<categories> {
    const categoryType = '/' + product.categoryType + '/';
    return this.httpClient.get<categories>(this.apiServer + categoryType);
  }

  update(id, product): Observable<categories> {
    const categoryType = '/' + product.categoryType + '/';
    return this.httpClient.put<categories>(this.apiServer + categoryType + id, JSON.stringify(product), this.httpOptions);
  }
  delete(product) {
    const categoryType = '/' + product.categoryType + '/';
    return this.httpClient.delete<categories>(this.apiServer + categoryType + product._id);
  }


  addItem(item) {
    this._items = item;
  }
  getItems() {
    return this._items;
  }

  getCategory(){
    return  [
      {
        topicName: 'Music',
        id: 'music',
      },
      {
        topicName: 'Cinemas',
        id: 'cinema',
      },
      {
        topicName: 'Books',
        id: 'book',
      },
      {
        topicName: 'unicorns',
        id: 'unicorns',
      }
    ];
  }
}
