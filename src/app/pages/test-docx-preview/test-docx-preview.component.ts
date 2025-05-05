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
  currentText="";
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

  private originalParamPositions: { [key: string]: number[] } = {};

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
    this.currentText = "";
    const container = this.previewContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    const viewportTop = container.scrollTop;
    const viewportBottom = viewportTop + containerRect.height;

    // Reset tất cả parameters về không visible
    this.parameters.forEach(param => param.isVisible = false);

    // Lấy tất cả text nodes trong container
    const textNodes = this.getAllTextNodes(container);

    // Duyệt qua từng text node để tính toán vị trí tương đối
    for (const node of textNodes) {
      const text = node.textContent || '';
      const elementRect = node.parentElement?.getBoundingClientRect();
      
      if (elementRect) {
        const elementTop = elementRect.top - containerRect.top + container.scrollTop;
        
        // Nếu node này nằm trong viewport
        if (elementTop >= viewportTop && elementTop <= viewportBottom) {
          this.currentText +=text;
        }
      }
    }
  }

  private getAllTextNodes(element: HTMLElement): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    return textNodes;
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
      
      // Lấy vị trí các params trong nội dung gốc
      this.originalParamPositions = this.docxService.getOriginalParamPositions();
      
      this.isFileLoaded = true;
      await this.docxService.updatePreviewWithParameters(this.parameters);
      
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
