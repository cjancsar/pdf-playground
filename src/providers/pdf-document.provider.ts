import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES, DEFAULT_SCALE } from '../constants';

export class PDFDocument {
  public supportedAnnotations: any[] = [];

  constructor(private readonly documentUrl: string) {
    // Using the fixed version CDN due to issues with `parcel` and static file handling (that I don't care about).
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';
  }

  /**
   * Render PDF document (and all pages with ArcForm Support)
   * Also retrieves (and sets) `PDFDocument.prototype.supportedAnnotations` with extract of form fields.
   */
  public async loadAndRenderDocument({ containerId }: { containerId: string }) {
    const container = document.getElementById(containerId);

    // Fetch the PDF document from the URL using promises.
    const doc = await pdfjsLib.getDocument(this.documentUrl).promise;

    let supportedAnnotations: any[] = [];

    for (var pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const pdfPage = await doc.getPage(pageNum);

      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: DEFAULT_SCALE,
        defaultViewport: pdfPage.getViewport({ scale: DEFAULT_SCALE }),
        eventBus: new pdfjsViewer.EventBus(),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });

      // Associate the actual page with the view and draw it.
      supportedAnnotations = supportedAnnotations.concat(await this._getSupportedAnnotations(pdfPage));

      await pdfPageView.setPdfPage(pdfPage);
      await pdfPageView.draw();
    }

    this.supportedAnnotations = supportedAnnotations;
  }

  /**
   * Returns the _supported_ (from `SUPPORTED_FORM_FIELD_TYPES`) form annotation properties.
   * @param {PDFPageProxy} pdfPage
   */
  private async _getSupportedAnnotations(pdfPage: any) {
    let annotations = await pdfPage.getAnnotations();
    return annotations
      .filter((a: any) => a.fieldType === SUPPORTED_FORM_FIELD_TYPES.TEXT)
      .map((a: any) => ({
        fieldType: a.fieldType,
        fieldName: a.fieldName,
        id: a.id,
        readonly: a.readonly,
        hasAppearance: a.hasAppearance,
        subtype: a.subtype,
      }));
  }
}
