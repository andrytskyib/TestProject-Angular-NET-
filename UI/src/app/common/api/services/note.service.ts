import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NoteModel } from '../models/note-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(public http: HttpClient) { }

  GetProductNote(id: string) {
    const url = environment.apiUrl + `/note?productId=${id}`;
    return this.http.get<NoteModel[]>(url).pipe(map(res => res));
  }

  CreateProductNote(params: NoteModel) {
    const url = environment.apiUrl + '/note';
    return this.http.post<NoteModel>(url, params).pipe(map(res => res));
  }

  UpdateProductNote(params: NoteModel) {
    const url = environment.apiUrl + `/note/${params.id}`;
    return this.http.put<NoteModel>(url, params).pipe(map(res => res));
  }

  DeleteProductNote(id: string) {
    const url = environment.apiUrl + `/note/${id}`;
    return this.http.delete<{}>(url).pipe(map(res => res));
  }
}
