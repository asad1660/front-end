import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  private path = environment.APIbaseUrl;
  private dataSource = new BehaviorSubject({});
  currentdata = this.dataSource.asObservable();
  constructor(private http: HttpClient) { }

  public getUserData(obj: any) {
		let path = `${this.path}/user`;
		return this.http.get(path, obj);
	}
  public uploadTest(obj: any) {
		let path = `${this.path}/upload`;
		return this.http.post(path, obj);
	}
	public update(obj: any) {
		let path = `${this.path}/update`;
		return this.http.post(path, obj);
	}
	changeData(data: any) {
		this.dataSource.next(data)
	  }
}
