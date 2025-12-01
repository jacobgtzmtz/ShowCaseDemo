import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";


export function handleError(error: HttpErrorResponse)  {
    let errorMessage = 'An unknown error ocurred!';

    if(error.error instanceof ErrorEvent){
        //Client side error
        errorMessage = `Error: ${error.error.message}` ;
    } else {
        //Server side error
        const message = error.error?.message || error.message;
        errorMessage = `Error Code: ${error.status}, Message: ${message}`;
    }

    console.error(errorMessage);
    return throwError( ()=> new Error(errorMessage))

}