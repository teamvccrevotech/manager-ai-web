import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DocxService } from './docx.service';

interface Parameter {
  key: string;
  value: string;
  isVisible?: boolean;
}

@Component({
  selector: 'app-test-docx-preview',
  templateUrl: './test-docx-preview.component.html',
  styleUrl: './test-docx-preview.component.scss',
})
export class TestDocxPreviewComponent implements OnInit, OnDestroy, AfterViewInit {
  parameters: Parameter[] = [
    { key: '{1}', value: '', isVisible: false },
    { key: '{2}', value: '', isVisible: false },
    { key: '{8}', value: '', isVisible: false },
    { key: '{11}', value: '', isVisible: false },
    { key: '{12}', value: '', isVisible: false },
    { key: '{13}', value: '', isVisible: false },
    { key: '{14}', value: '', isVisible: false },
    { key: '{E1}', value: '', isVisible: false },
    { key: '{E2}', value: '', isVisible: false },
  ];

  private debounceTimeout: any;
  private scrollTimeout: any;
  @ViewChild('previewContainer') previewContainer: ElementRef;
  isFileLoaded = false;

  constructor(private docxService: DocxService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.previewContainer.nativeElement.addEventListener('scroll', this.onPreviewScroll.bind(this));
  }

  private onPreviewScroll() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.checkVisibleParameters();
    }, 100);
  }

  private checkVisibleParameters() {
    const container = this.previewContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    const viewportTop = container.scrollTop;
    const viewportBottom = viewportTop + containerRect.height;

    // Reset tất cả parameters về không visible
    this.parameters.forEach(param => param.isVisible = false);

    // Tìm tất cả các elements chứa parameters trong preview
    const paramElements = container.getElementsByClassName('param-highlight');
    
    Array.from(paramElements).forEach((element: HTMLElement) => {
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top - containerRect.top + container.scrollTop;
      
      // Kiểm tra element có nằm trong viewport không
      if (elementTop >= viewportTop && elementTop <= viewportBottom) {
        const paramKey = element.getAttribute('data-param');
        const param = this.parameters.find(p => p.key === paramKey);
        if (param) {
          param.isVisible = true;
        }
      }
    });

    // Force change detection
    this.parameters = [...this.parameters];
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.name.endsWith('.docx')) {
      alert('Vui lòng chọn file định dạng .docx');
      return;
    }

    try {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      this.docxService.setCurrentFile(arrayBuffer);
      this.docxService.setPreviewElement(this.previewContainer.nativeElement);
      this.isFileLoaded = true;
      await this.docxService.updatePreviewWithParameters(this.parameters);
      
      // Kiểm tra parameters sau khi render
      setTimeout(() => {
        this.checkVisibleParameters();
      }, 500);
    } catch (error) {
      console.error('Lỗi khi xử lý file:', error);
      alert('Có lỗi xảy ra khi xử lý file');
    }
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  async onParameterChange(param: Parameter) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(async () => {
      await this.docxService.updatePreviewWithParameters(this.parameters);
      this.checkVisibleParameters();
    }, 300);
  }

  ngOnDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.previewContainer?.nativeElement) {
      this.previewContainer.nativeElement.removeEventListener('scroll', this.onPreviewScroll);
    }
  }
}
