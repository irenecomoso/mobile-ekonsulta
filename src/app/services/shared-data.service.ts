/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  list: any = [];
  constructor() { }

  set_list(list)
  {
    this.list = list;
    //console.log(this.list);
  }
  get_list()
  {
    return this.list;
  }
}
