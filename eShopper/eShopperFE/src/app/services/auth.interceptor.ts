import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    getToken = ()=>{
    
            return localStorage.getItem('token');
          
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
       
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.getToken()}`
          }
        });
        return next.handle(request);
      }
}

