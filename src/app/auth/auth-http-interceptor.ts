import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable() // Http Interceptor only gets injectable with no options
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Set cookies to true with all requests
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);
    // .pipe(
    //   // filter(val => val.type === HttpEventType.Sent)
    //   tap((val) => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('Sent a request to the server');
    //     }
    //     if (val.type === HttpEventType.Response) {
    //       console.log('Got a response from the API', val);
    //     }
    //   })
    // );
  }
}
