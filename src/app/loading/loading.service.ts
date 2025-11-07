import {Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  #loadingSignal= signal(false);
  loading= this.#loadingSignal.asReadonly(); // public version of loading which is read-only signal
  loadingOff(){
    this.#loadingSignal.set(false);
  }

  loadingOn(){
    this.#loadingSignal.set(true);
  }
}
