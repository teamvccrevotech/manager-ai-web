import {FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const LANGUAGE = "language";
export const LANGUAGE_EN = "en";
export const VOIDED_CHOICE = [
  {value: false, label: "common.voidedFalse"},
  {value: true, label: "common.voidedTrue"},
]
export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
export const PHONE_NUMBER_REGEX = "((84|0|'+'84)[3|5|7|8|9])+([0-9]{8})";
export const getDescription = (store: any[], value: any) => {
  return store.find((item: any) => item.value === value)?.label || "";
}
