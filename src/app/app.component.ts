import {AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {StorageService} from "./services/storage.service";
import { PreloaderService } from './services/preloader.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,AfterViewInit{
  ngAfterViewInit(): void {
    this.preloader.hide();
    this.cdr.detectChanges();
  }
  constructor(
    private preloader: PreloaderService,
    private translate: TranslateService,
    private storeService: StorageService,
    private cdr : ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.translate.use(this.storeService.getLanguage())
  }
}
