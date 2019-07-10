import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeType = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();

  const fileReaderObs = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    fileReader.onloadend = () => {
      const unsignedArr = new Uint8Array(fileReader.result).subarray(0, 4);
      let header = '';
      let isValid = false;
      for (let i = 0; i < unsignedArr.length; i++) {
        header += unsignedArr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          // type = 'image/png';
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          // type = 'image/jpeg';
          isValid = true;
          break;
        default:
          // type = 'unknown'; // Or you can use the blob.type as fallback
          isValid = false;
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({mimeTypeInvalid: true});
        // observer.next(null);
      }

      observer.complete();
    };

    fileReader.readAsArrayBuffer(file);

  });

  return fileReaderObs;
};
