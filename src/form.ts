import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES } from './constants';

// Using the fixed version CDN due to issues with `parcel` and static file handling.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';

var DEFAULT_URL = '/pdfs/fw4.pdf';
var DEFAULT_SCALE = 1.0;

var container = document.getElementById('pageContainer');

var eventBus = new pdfjsViewer.EventBus();

(async () => {
  // Fetch the PDF document from the URL using promises.
  const doc = await pdfjsLib.getDocument(DEFAULT_URL).promise;
  // const doc = await docRoot.promise;

  for (var pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const pdfPage = await doc.getPage(pageNum);

    var pdfPageView = new pdfjsViewer.PDFPageView({
      container: container,
      id: pageNum,
      scale: DEFAULT_SCALE,
      defaultViewport: pdfPage.getViewport({ scale: DEFAULT_SCALE }),
      eventBus: eventBus,
      annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
      renderInteractiveForms: true,
    });

    // Associate the actual page with the view and draw it.
    console.log(await _getSupportedAnnotations(pdfPage));

    pdfPageView.setPdfPage(pdfPage);
    pdfPageView.draw();
  }
})();

/**
 * Returns the _supported_ (from `SUPPORTED_FORM_FIELD_TYPES`) form annotation properties.
 * @param {PDFPageProxy} pdfPage
 */
async function _getSupportedAnnotations(pdfPage: any) {
  let annotations = await pdfPage.getAnnotations();
  // todo fix these typings
  return annotations
    .filter(a => a.fieldType === SUPPORTED_FORM_FIELD_TYPES.TEXT)
    .map(a => ({
      fieldType: a.fieldType,
      fieldName: a.fieldName,
      id: a.id,
      readonly: a.readonly,
      hasAppearance: a.hasAppearance,
      subtype: a.subtype,
    }));
}

// // Fetch the PDF document from the URL using promises.
// var loadingTask = pdfjsLib.getDocument(DEFAULT_URL);
// loadingTask.promise.then(function (doc) {
//   // Use a promise to fetch and render the next page.
//   var promise = Promise.resolve();

//   for (var i = 1; i <= doc.numPages; i++) {
//     promise = promise.then(
//       function (pageNum) {
//         return doc.getPage(pageNum).then(function (pdfPage) {
//           // Create the page view.
//           var pdfPageView = new pdfjsViewer.PDFPageView({
//             container: container,
//             id: pageNum,
//             scale: DEFAULT_SCALE,
//             defaultViewport: pdfPage.getViewport({ scale: DEFAULT_SCALE }),
//             eventBus: eventBus,
//             annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
//             renderInteractiveForms: true,
//           });

//           // Associate the actual page with the view and draw it.
//           pdfPageView.setPdfPage(pdfPage);
//           return pdfPageView.draw();
//         });
//       }.bind(null, i)
//     );
//   }
// });
