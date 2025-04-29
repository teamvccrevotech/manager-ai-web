import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { renderAsync } from 'docx-preview';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { Observable } from 'rxjs';

interface Parameter {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocxService {
  private currentFile: ArrayBuffer;
  private previewElement: HTMLElement;

  constructor(private http: HttpClient) {}

  getDocxFile(): Observable<ArrayBuffer> {
    // Thay thế URL bằng endpoint thực tế của bạn
    return this.http.get('your-api-endpoint', {
      responseType: 'arraybuffer'
    });
  }

  setCurrentFile(file: ArrayBuffer) {
    this.currentFile = file;
  }

  setPreviewElement(element: HTMLElement) {
    this.previewElement = element;
  }

  async updatePreviewWithParameters(parameters: Parameter[]) {
    if (!this.currentFile || !this.previewElement) return;

    try {
      // Chuyển ArrayBuffer thành binary string
      const binaryString = this.arrayBufferToBinary(this.currentFile);
      
      // Tạo một instance của PizZip với binary string
      const zip = new PizZip(binaryString);
      
      // Tạo một instance của Docxtemplater
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Chuẩn bị data để replace
      const data = {};
      parameters.forEach(param => {
        // Loại bỏ dấu {} từ key
        const cleanKey = param.key.replace(/[{}]/g, '');
        data[cleanKey] = param.value || param.key || '';
      });

      // Render document với data
      doc.render(data);

      // Lấy binary content của file đã được thay thế
      const buffer = doc.getZip().generate({
        type: 'arraybuffer',
        compression: 'DEFLATE'
      });

      // Render preview với options cụ thể
      await renderAsync(buffer, this.previewElement, null, {
        className: 'docx-preview',
        inWrapper:true, //enables rendering of wrapper around document content
        hideWrapperOnPrint:  false, //disable wrapper styles on print
        ignoreWidth:  false, //disables rendering width of page
        ignoreHeight:  false, //disables rendering height of page
        ignoreFonts:  false, //disables fonts rendering
        breakPages:  true, //enables page breaking on page breaks
        ignoreLastRenderedPageBreak:  true, //disables page breaking on lastRenderedPageBreak elements
        experimental:  false, //enables experimental features (tab stops calculation)
        trimXmlDeclaration:  true, //if true, xml declaration will be removed from xml documents before parsing
        useBase64URL:  true, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
        renderChanges: true, //enables experimental rendering of document changes (inserions/deletions)
        renderHeaders: true, //enables headers rendering
        renderFooters: true, //enables footers rendering
        renderFootnotes: true, //enables footnotes rendering
        renderEndnotes: true, //enables endnotes rendering
        renderComments: false, //enables experimental comments rendering
        renderAltChunks: true, //enables altChunks (html parts) rendering
        debug:  false, //enables additional logging
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật preview:', error);
    }
  }

  private arrayBufferToBinary(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
}
